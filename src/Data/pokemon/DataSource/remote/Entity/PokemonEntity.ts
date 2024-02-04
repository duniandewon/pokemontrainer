export interface Data {
  pokemon_v2_pokemon: PokemonV2Pokemon[];
}

interface PokemonV2Pokemon {
  id: number;
  name: string;
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
