export interface PokemonStats {
  hp: number;
  speed: number;
  attack: number;
  defense: number;
  weight: number;
}

export interface PokemonDb {
  id: number;
  name: string;
  image: string;
  prevMeal: string;
  maxWeight: number;
  nextEvolution: number;
  stats: PokemonStats;
}
