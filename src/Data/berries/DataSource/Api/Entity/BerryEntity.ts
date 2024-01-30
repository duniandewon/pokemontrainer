export interface BerryEntity {
  data: Data;
  meta: Meta;
}

export interface Data {
  pokemon_v2_berry: PokemonV2Berry[];
}

export interface PokemonV2Berry {
  pokemon_v2_item:          PokemonV2Item;
  pokemon_v2_berryfirmness: PokemonV2Berryfirmness;
}

export interface PokemonV2Berryfirmness {
  name: string;
}

export interface PokemonV2Item {
  id:                     number;
  name:                   string;
  pokemon_v2_itemsprites: PokemonV2Itemsprite[];
}

export interface PokemonV2Itemsprite {
  sprites: Sprites;
}

export interface Sprites {
  default: string;
}

interface Meta {
  hasNext: boolean;
  nextOffset: number;
}
