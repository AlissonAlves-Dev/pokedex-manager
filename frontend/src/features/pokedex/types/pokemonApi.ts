export type PokemonApiListItem = {
  name: string;
  url: string;
};

export type PokemonApiListResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonApiListItem[];
};

export type PokemonApiDetailResponse = {
  id: number;
  name: string;
  sprites: {
    other: {
      "official-artwork": {
        front_default: string | null;
      };
    };
  };
  types: {
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }[];
};
