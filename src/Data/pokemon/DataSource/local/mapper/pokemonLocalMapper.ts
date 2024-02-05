import { PokemonDetail } from "@/Domain/pokemon/Model/PokemonDetail";
import { PokemonDb } from "../model/pokemonDb";

export function mapFromLocal(pokemonLocal: PokemonDb): PokemonDetail {
  return {
    id: pokemonLocal.id,
    image: pokemonLocal.image,
    maxWeight: pokemonLocal.maxWeight,
    name: pokemonLocal.name,
    nextEvolution: pokemonLocal.nextEvolution,
    prevMeal: pokemonLocal.prevMeal,
    stats: pokemonLocal.stats,
  };
}

export function mapToLocal(pokemon: PokemonDetail): PokemonDb {
  return {
    id: pokemon.id,
    image: pokemon.image,
    maxWeight: pokemon.maxWeight,
    name: pokemon.name,
    nextEvolution: pokemon.nextEvolution,
    prevMeal: pokemon.prevMeal,
    stats: pokemon.stats,
  };
}
