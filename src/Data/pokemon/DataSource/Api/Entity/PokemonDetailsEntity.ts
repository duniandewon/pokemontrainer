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

interface GenerationV {
  "black-white": Sprites;
}

interface GenerationIv {
  platinum: Sprites;
  "diamond-pearl": Sprites;
  "heartgold-soulsilver": Sprites;
}

interface Versions {
  "generation-i": GenerationI;
  "generation-v": GenerationV;
  "generation-ii": GenerationIi;
  "generation-iv": GenerationIv;
  "generation-vi": { [key: string]: Home };
  "generation-iii": GenerationIii;
  "generation-vii": GenerationVii;
  "generation-viii": GenerationViii;
}

interface Other {
  home: Home;
  showdown: Sprites;
  dream_world: DreamWorld;
  "official-artwork": OfficialArtwork;
}

interface Sprites {
  other?: Other;
  versions?: Versions;
  back_shiny: string;
  back_female: null;
  front_shiny: string;
  back_default: string;
  front_female: null;
  front_default: string;
  back_shiny_female: null;
  front_shiny_female: null;
  animated?: Sprites;
}

interface GenerationI {
  yellow: RedBlue;
  "red-blue": RedBlue;
}

interface RedBlue {
  back_gray: string;
  front_gray: string;
  back_default: string;
  front_default: string;
  back_transparent: string;
  front_transparent: string;
}

interface GenerationIi {
  gold: Gold;
  silver: Gold;
  crystal: Crystal;
}

interface Crystal {
  back_shiny: string;
  front_shiny: string;
  back_default: string;
  front_default: string;
  back_transparent: string;
  front_transparent: string;
  back_shiny_transparent: string;
  front_shiny_transparent: string;
}

interface Gold {
  back_shiny: string;
  front_shiny: string;
  back_default: string;
  front_default: string;
  front_transparent?: string;
}

interface GenerationIii {
  emerald: OfficialArtwork;
  "ruby-sapphire": Gold;
  "firered-leafgreen": Gold;
}

interface OfficialArtwork {
  front_shiny: string;
  front_default: string;
}

interface Home {
  front_shiny: string;
  front_female: null;
  front_default: string;
  front_shiny_female: null;
}

interface GenerationVii {
  icons: DreamWorld;
  "ultra-sun-ultra-moon": Home;
}

interface DreamWorld {
  front_female: null;
  front_default: string;
}

interface GenerationViii {
  icons: DreamWorld;
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
  name: string;
  weight: number;
}
