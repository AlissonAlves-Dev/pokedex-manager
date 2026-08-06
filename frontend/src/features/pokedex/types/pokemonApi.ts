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

export type PokemonApiNamedResource = {
  name: string;
  url: string;
};

export type PokemonApiResource = {
  url: string;
};

export type PokemonApiTypeSlot = {
  slot: number;
  type: {
    name: string;
  };
};

export type PokemonApiDetailResponse = {
  id: number;
  name: string;
  height: number;
  weight: number;

  is_default: boolean;
  species: PokemonApiNamedResource;
  forms: PokemonApiNamedResource[];

  sprites: {
    front_default: string | null;
    front_shiny: string | null;

    other: {
      "official-artwork": {
        front_default: string | null;
      };
    };
  };

  types: PokemonApiTypeSlot[];

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

export type PokemonApiFlavorTextEntry = {
  flavor_text: string;
  language: PokemonApiNamedResource;
  version: PokemonApiNamedResource;
};

export type PokemonApiSpeciesVariety = {
  is_default: boolean;
  pokemon: PokemonApiNamedResource;
};

export type PokemonApiSpeciesResponse = {
  id: number;

  evolution_chain: PokemonApiResource;
  flavor_text_entries: PokemonApiFlavorTextEntry[];

  varieties: PokemonApiSpeciesVariety[];
  forms_switchable: boolean;
  has_gender_differences: boolean;
};

export type PokemonApiFormResponse = {
  id: number;
  name: string;
  form_name: string;
  form_order: number;

  is_default: boolean;
  is_battle_only: boolean;
  is_mega: boolean;

  pokemon: PokemonApiNamedResource;

  sprites: {
    front_default: string | null;
    front_shiny: string | null;
  };

  types: PokemonApiTypeSlot[];

  version_group: PokemonApiNamedResource;
};

export type PokemonApiEvolutionDetail = {
  is_default: boolean;

  base_form: PokemonApiNamedResource | null;
  evolved_form: PokemonApiNamedResource | null;
  region: PokemonApiNamedResource | null;

  trigger: PokemonApiNamedResource;
  version_group: PokemonApiNamedResource | null;

  item: PokemonApiNamedResource | null;
  held_item: PokemonApiNamedResource | null;
  known_move: PokemonApiNamedResource | null;
  known_move_type: PokemonApiNamedResource | null;
  location: PokemonApiNamedResource | null;
  party_species: PokemonApiNamedResource | null;
  party_type: PokemonApiNamedResource | null;
  trade_species: PokemonApiNamedResource | null;

  gender: number | null;
  min_level: number | null;
  min_happiness: number | null;
  min_beauty: number | null;
  min_affection: number | null;
  relative_physical_stats: number | null;

  time_of_day: string;

  near_special_rock: boolean;
  needs_overworld_rain: boolean;
  turn_upside_down: boolean;
};

export type PokemonApiEvolutionChainLink = {
  is_baby: boolean;
  species: PokemonApiNamedResource;
  evolution_details: PokemonApiEvolutionDetail[] | null;
  evolves_to: PokemonApiEvolutionChainLink[];
};

export type PokemonApiEvolutionChainResponse = {
  id: number;
  baby_trigger_item: PokemonApiNamedResource | null;
  chain: PokemonApiEvolutionChainLink;
};
