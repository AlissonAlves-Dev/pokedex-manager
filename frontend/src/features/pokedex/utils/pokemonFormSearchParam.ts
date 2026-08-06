export type PokemonFormSearchParamResult =
  | {
      status: "absent";
      formId: null;
    }
  | {
      status: "valid";
      formId: number;
    }
  | {
      status: "invalid";
      formId: null;
    };

const CANONICAL_POSITIVE_INTEGER_PATTERN = /^[1-9]\d*$/;

export function parsePokemonFormSearchParam(
  searchParams: URLSearchParams,
): PokemonFormSearchParamResult {
  const formValues = searchParams.getAll("form");

  if (formValues.length === 0) {
    return {
      status: "absent",
      formId: null,
    };
  }

  if (formValues.length !== 1) {
    return {
      status: "invalid",
      formId: null,
    };
  }

  const [formValue] = formValues;

  if (!CANONICAL_POSITIVE_INTEGER_PATTERN.test(formValue)) {
    return {
      status: "invalid",
      formId: null,
    };
  }

  const formId = Number(formValue);

  if (!Number.isSafeInteger(formId)) {
    return {
      status: "invalid",
      formId: null,
    };
  }

  return {
    status: "valid",
    formId,
  };
}
