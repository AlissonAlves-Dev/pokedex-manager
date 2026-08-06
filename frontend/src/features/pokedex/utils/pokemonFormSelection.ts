import type { PokemonFormReference } from "../types/pokemon";
import type { PokemonFormSearchParamResult } from "./pokemonFormSearchParam";

export type PokemonFormSelection =
  | {
      status: "base";
      formId: null;
      form: null;
    }
  | {
      status: "invalid-query";
      formId: null;
      form: null;
    }
  | {
      status: "unavailable";
      formId: number;
      form: null;
    }
  | {
      status: "selected";
      formId: number;
      form: PokemonFormReference;
    };

export function resolvePokemonFormSelection(
  searchParam: PokemonFormSearchParamResult,
  availableForms: PokemonFormReference[],
): PokemonFormSelection {
  if (searchParam.status === "absent") {
    return {
      status: "base",
      formId: null,
      form: null,
    };
  }

  if (searchParam.status === "invalid") {
    return {
      status: "invalid-query",
      formId: null,
      form: null,
    };
  }

  const selectedForm = availableForms.find(
    ({ id }) => id === searchParam.formId,
  );

  if (!selectedForm) {
    return {
      status: "unavailable",
      formId: searchParam.formId,
      form: null,
    };
  }

  return {
    status: "selected",
    formId: selectedForm.id,
    form: selectedForm,
  };
}
