export interface PokemonDetailEntity {
  data: Data;
}

export interface Data {
  pokemon_v2_pokemon: DataPokemonV2Pokemon[];
  pokemon_v2_pokemonspecies: PokemonV2Pokemonspecy[];
}

interface DataPokemonV2Pokemon {
  id: number;
  name: string;
  weight: number;
  pokemon_v2_pokemonstats: PokemonV2Pokemonstat[];
  pokemon_v2_pokemonsprites: PokemonV2Pokemonsprite[];
}

interface PokemonV2Pokemonsprite {
  sprites: Sprites;
}

interface Other {
  "official-artwork": OfficialArtwork;
}

interface Sprites {
  other?: Other;
}

interface OfficialArtwork {
  front_shiny: string;
  front_default: string;
}

export interface PokemonV2Pokemonstat {
  base_stat: number;
  pokemon_v2_stat: PokemonV2Stat;
}

interface PokemonV2Stat {
  name: string;
}

export interface PokemonV2Pokemonspecy {
  pokemon_v2_pokemons: PokemonV2PokemonspecyPokemonV2Pokemon[];
}

export interface PokemonV2PokemonspecyPokemonV2Pokemon {
  id: number;
  name?: string;
  weight: number;
}
