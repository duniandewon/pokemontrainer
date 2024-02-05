import { localStorageManager } from "@/utils/LocalStorageManager";

import { pokemonDao } from "../dao/pokemonDao";
import { PokemonDb } from "../model/pokemonDb";

export function pokemonDataBaseImpl(): pokemonDao {
  const localStorage = localStorageManager<PokemonDb[]>("my-pokemons");

  return {
    choosePokemon(pokemon) {
      localStorage.insert<PokemonDb>(pokemon);
    },
    evolvePokemon(prevPokemonId, newPokemon) {
      localStorage.remove<PokemonDb>(prevPokemonId);

      localStorage.insert<PokemonDb>(newPokemon);

      return newPokemon;
    },
  };
}
