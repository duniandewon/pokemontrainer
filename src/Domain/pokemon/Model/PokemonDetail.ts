export interface PokemonStats {
  hp: number;
  speed: number;
  attack: number;
  defense: number;
  weight: number;
}

export interface PokemonDetail {
  id: number;
  name: string;
  image: string;
  maxWeight: number;
  nextEvolution: number;
  stats: PokemonStats;
  prevMeal: string;
}
