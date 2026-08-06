import { act, renderHook, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { getPokemonFormById } from "../services/pokemonService";
import type { PokemonFormDetails } from "../types/pokemon";
import { usePokemonForm } from "./usePokemonForm";

vi.mock("../services/pokemonService", () => ({
  getPokemonFormById: vi.fn(),
}));

const getPokemonFormByIdMock = vi.mocked(getPokemonFormById);

function createPokemonFormDetails(
  overrides: Partial<PokemonFormDetails> = {},
): PokemonFormDetails {
  return {
    id: 25,
    pokemonId: 25,

    name: "pikachu",
    displayName: "Pikachu",
    formName: null,

    isDefault: true,
    isBattleOnly: false,
    isMega: false,

    formOrder: 1,

    types: ["electric"],

    sprites: {
      frontDefaultUrl: "https://example.com/pikachu.png",
      frontShinyUrl: "https://example.com/pikachu-shiny.png",
    },

    versionGroupName: "red-blue",

    ...overrides,
  };
}

type DeferredPromise<T> = {
  promise: Promise<T>;
  resolve: (value: T) => void;
  reject: (reason?: unknown) => void;
};

type UsePokemonFormProps = {
  pokemonId: number | null;
  formId: number | null;
};

function createDeferredPromise<T>(): DeferredPromise<T> {
  let resolve!: (value: T) => void;
  let reject!: (reason?: unknown) => void;

  const promise = new Promise<T>((promiseResolve, promiseReject) => {
    resolve = promiseResolve;
    reject = promiseReject;
  });

  return {
    promise,
    resolve,
    reject,
  };
}

beforeEach(() => {
  getPokemonFormByIdMock.mockReset();
});

describe("usePokemonForm", () => {
  it("não realiza requisição quando nenhuma forma está selecionada", () => {
    const { result } = renderHook(() => usePokemonForm(25, null));

    expect(result.current).toMatchObject({
      pokemonForm: null,
      isLoading: false,
      error: null,
    });

    expect(getPokemonFormByIdMock).not.toHaveBeenCalled();
  });

  it("não realiza requisição quando o Pokémon atual está ausente", () => {
    const { result } = renderHook(() => usePokemonForm(null, 25));

    expect(result.current).toMatchObject({
      pokemonForm: null,
      isLoading: false,
      error: null,
    });

    expect(getPokemonFormByIdMock).not.toHaveBeenCalled();
  });

  it("carrega a forma selecionada", async () => {
    const pokemonForm = createPokemonFormDetails();

    getPokemonFormByIdMock.mockResolvedValueOnce(pokemonForm);

    const { result } = renderHook(() => usePokemonForm(25, 25));

    expect(result.current.pokemonForm).toBeNull();
    expect(result.current.isLoading).toBe(true);
    expect(result.current.error).toBeNull();

    await waitFor(() => {
      expect(result.current.pokemonForm).toEqual(pokemonForm);
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();

    expect(getPokemonFormByIdMock).toHaveBeenCalledTimes(1);
    expect(getPokemonFormByIdMock).toHaveBeenCalledWith(
      25,
      expect.any(AbortSignal),
    );
  });

  it("rejeita uma forma associada a outro Pokémon", async () => {
    getPokemonFormByIdMock.mockResolvedValueOnce(
      createPokemonFormDetails({
        pokemonId: 26,
      }),
    );

    const { result } = renderHook(() => usePokemonForm(25, 25));

    await waitFor(() => {
      expect(result.current.error).toBe(
        "A forma selecionada não pertence ao Pokémon atual.",
      );
    });

    expect(result.current.pokemonForm).toBeNull();
    expect(result.current.isLoading).toBe(false);
  });

  it("expõe a mensagem de erro do service", async () => {
    getPokemonFormByIdMock.mockRejectedValueOnce(
      new Error("Não foi possível carregar os dados da forma do Pokémon."),
    );

    const { result } = renderHook(() => usePokemonForm(25, 25));

    await waitFor(() => {
      expect(result.current.error).toBe(
        "Não foi possível carregar os dados da forma do Pokémon.",
      );
    });

    expect(result.current.pokemonForm).toBeNull();
    expect(result.current.isLoading).toBe(false);
  });

  it("permite tentar novamente somente a requisição da forma", async () => {
    const pokemonForm = createPokemonFormDetails();

    getPokemonFormByIdMock
      .mockRejectedValueOnce(new Error("Falha temporária."))
      .mockResolvedValueOnce(pokemonForm);

    const { result } = renderHook(() => usePokemonForm(25, 25));

    await waitFor(() => {
      expect(result.current.error).toBe("Falha temporária.");
    });

    act(() => {
      result.current.retry();
    });

    expect(result.current.pokemonForm).toBeNull();
    expect(result.current.isLoading).toBe(true);
    expect(result.current.error).toBeNull();

    await waitFor(() => {
      expect(result.current.pokemonForm).toEqual(pokemonForm);
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();

    expect(getPokemonFormByIdMock).toHaveBeenCalledTimes(2);
  });

  it("cancela a requisição anterior quando a forma selecionada muda", async () => {
    const firstRequest = createDeferredPromise<PokemonFormDetails>();
    const secondRequest = createDeferredPromise<PokemonFormDetails>();

    let firstSignal: AbortSignal | undefined;
    let secondSignal: AbortSignal | undefined;

    getPokemonFormByIdMock
      .mockImplementationOnce((_formId, signal) => {
        firstSignal = signal;

        return firstRequest.promise;
      })
      .mockImplementationOnce((_formId, signal) => {
        secondSignal = signal;

        return secondRequest.promise;
      });

    const initialProps: UsePokemonFormProps = {
      pokemonId: 25,
      formId: 25,
    };

    const { result, rerender } = renderHook(
      ({ pokemonId, formId }: UsePokemonFormProps) =>
        usePokemonForm(pokemonId, formId),
      {
        initialProps,
      },
    );

    expect(result.current.isLoading).toBe(true);

    rerender({
      pokemonId: 25,
      formId: 10080,
    });

    await waitFor(() => {
      expect(getPokemonFormByIdMock).toHaveBeenCalledTimes(2);
    });

    expect(firstSignal?.aborted).toBe(true);
    expect(secondSignal?.aborted).toBe(false);

    expect(result.current.pokemonForm).toBeNull();
    expect(result.current.isLoading).toBe(true);
    expect(result.current.error).toBeNull();

    await act(async () => {
      firstRequest.resolve(
        createPokemonFormDetails({
          id: 25,
          pokemonId: 25,
          name: "pikachu",
          displayName: "Pikachu",
        }),
      );

      await Promise.resolve();
    });

    expect(result.current.pokemonForm).toBeNull();
    expect(result.current.isLoading).toBe(true);

    const currentPokemonForm = createPokemonFormDetails({
      id: 10080,
      pokemonId: 25,
      name: "pikachu-cosplay",
      displayName: "Pikachu Cosplay",
    });

    await act(async () => {
      secondRequest.resolve(currentPokemonForm);

      await Promise.resolve();
    });

    await waitFor(() => {
      expect(result.current.pokemonForm).toEqual(currentPokemonForm);
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it("cancela a requisição da forma quando o Pokémon atual muda", async () => {
    const firstRequest = createDeferredPromise<PokemonFormDetails>();
    const secondRequest = createDeferredPromise<PokemonFormDetails>();

    let firstSignal: AbortSignal | undefined;
    let secondSignal: AbortSignal | undefined;

    getPokemonFormByIdMock
      .mockImplementationOnce((_formId, signal) => {
        firstSignal = signal;

        return firstRequest.promise;
      })
      .mockImplementationOnce((_formId, signal) => {
        secondSignal = signal;

        return secondRequest.promise;
      });

    const initialProps: UsePokemonFormProps = {
      pokemonId: 25,
      formId: 25,
    };

    const { result, rerender } = renderHook(
      ({ pokemonId, formId }: UsePokemonFormProps) =>
        usePokemonForm(pokemonId, formId),
      {
        initialProps,
      },
    );

    rerender({
      pokemonId: 26,
      formId: 26,
    });

    await waitFor(() => {
      expect(getPokemonFormByIdMock).toHaveBeenCalledTimes(2);
    });

    expect(firstSignal?.aborted).toBe(true);
    expect(secondSignal?.aborted).toBe(false);

    expect(result.current.pokemonForm).toBeNull();
    expect(result.current.isLoading).toBe(true);

    const currentPokemonForm = createPokemonFormDetails({
      id: 26,
      pokemonId: 26,
      name: "raichu",
      displayName: "Raichu",
    });

    await act(async () => {
      secondRequest.resolve(currentPokemonForm);

      await Promise.resolve();
    });

    await waitFor(() => {
      expect(result.current.pokemonForm).toEqual(currentPokemonForm);
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it("cancela a requisição quando a seleção da forma é removida", async () => {
    const request = createDeferredPromise<PokemonFormDetails>();

    let requestSignal: AbortSignal | undefined;

    getPokemonFormByIdMock.mockImplementationOnce((_formId, signal) => {
      requestSignal = signal;

      return request.promise;
    });

    const initialProps: UsePokemonFormProps = {
      pokemonId: 25,
      formId: 25,
    };

    const { result, rerender } = renderHook(
      ({ pokemonId, formId }: UsePokemonFormProps) =>
        usePokemonForm(pokemonId, formId),
      {
        initialProps,
      },
    );

    expect(result.current.isLoading).toBe(true);

    rerender({
      pokemonId: 25,
      formId: null,
    });

    expect(requestSignal?.aborted).toBe(true);

    expect(result.current).toMatchObject({
      pokemonForm: null,
      isLoading: false,
      error: null,
    });

    await act(async () => {
      request.resolve(createPokemonFormDetails());

      await Promise.resolve();
    });

    expect(result.current).toMatchObject({
      pokemonForm: null,
      isLoading: false,
      error: null,
    });
  });

  it("cancela a requisição ao desmontar o hook", () => {
    const request = createDeferredPromise<PokemonFormDetails>();

    let requestSignal: AbortSignal | undefined;

    getPokemonFormByIdMock.mockImplementationOnce((_formId, signal) => {
      requestSignal = signal;

      return request.promise;
    });

    const { unmount } = renderHook(() => usePokemonForm(25, 25));

    expect(requestSignal?.aborted).toBe(false);

    unmount();

    expect(requestSignal?.aborted).toBe(true);
  });

  it("não expõe erro quando a requisição é cancelada", async () => {
    getPokemonFormByIdMock.mockImplementationOnce(
      async (_formId, signal) =>
        new Promise<PokemonFormDetails>((_resolve, reject) => {
          signal?.addEventListener("abort", () => {
            reject(
              new DOMException("The operation was aborted.", "AbortError"),
            );
          });
        }),
    );

    const initialProps: UsePokemonFormProps = {
      pokemonId: 25,
      formId: 25,
    };

    const { result, rerender } = renderHook(
      ({ pokemonId, formId }: UsePokemonFormProps) =>
        usePokemonForm(pokemonId, formId),
      {
        initialProps,
      },
    );

    rerender({
      pokemonId: 25,
      formId: null,
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.pokemonForm).toBeNull();
    expect(result.current.error).toBeNull();
  });

  it("cancela a tentativa anterior ao executar retry", async () => {
    const firstRequest = createDeferredPromise<PokemonFormDetails>();
    const secondRequest = createDeferredPromise<PokemonFormDetails>();

    let firstSignal: AbortSignal | undefined;
    let secondSignal: AbortSignal | undefined;

    getPokemonFormByIdMock
      .mockImplementationOnce((_formId, signal) => {
        firstSignal = signal;

        return firstRequest.promise;
      })
      .mockImplementationOnce((_formId, signal) => {
        secondSignal = signal;

        return secondRequest.promise;
      });

    const { result } = renderHook(() => usePokemonForm(25, 25));

    act(() => {
      result.current.retry();
    });

    await waitFor(() => {
      expect(getPokemonFormByIdMock).toHaveBeenCalledTimes(2);
    });

    expect(firstSignal?.aborted).toBe(true);
    expect(secondSignal?.aborted).toBe(false);

    const pokemonForm = createPokemonFormDetails();

    await act(async () => {
      secondRequest.resolve(pokemonForm);

      await Promise.resolve();
    });

    await waitFor(() => {
      expect(result.current.pokemonForm).toEqual(pokemonForm);
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });
});
