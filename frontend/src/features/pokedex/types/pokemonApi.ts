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
  height: number;
  weight: number;

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
    };
  }[];

  abilities: {
    ability: {
      name: string;
    };
    is_hidden: boolean;
    slot: number;
  }[];

  stats: {
    base_stat: number;
    effort: number;
    stat: {
      name: string;
    };
  }[];
};
