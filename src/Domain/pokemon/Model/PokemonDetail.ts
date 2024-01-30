import { Pokemon } from "./Pokemon";

export interface PokemonStats {
  hp: number;
  speed: number;
  attack: number;
  defense: number;
  weight: number;
}

export interface PokemonDetail extends Pokemon {
  maxWeight: number;
  nextEvolution: number;
  stats: PokemonStats;
}
