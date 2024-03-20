import { localStorageManager } from "@/utils/LocalStorageManager";

import { pokemonDao } from "../dao/pokemonDao";
import { PokemonDb } from "../model/pokemonDb";

export function pokemonDataBaseImpl(): pokemonDao {
  const localStorage = localStorageManager<PokemonDb>("my-pokemons");

  const getIncreaseBy = (firmnes: string, isPoison: boolean) => {
    let increaseBy = 0;

    switch (firmnes) {
      case "very-soft":
        increaseBy = 2;
        break;
      case "soft":
        increaseBy = 3;
        break;
      case "hard":
        increaseBy = 5;
        break;
      case "very-hard":
        increaseBy = 8;
        break;
      case "super-hard":
        increaseBy = 10;
        break;
      default:
        increaseBy = 1;
        break;
    }
    return isPoison ? increaseBy * -2 : increaseBy;
  };

  return {
    getMyPokemon() {
      const myPokemon = localStorage.getAll();

      return myPokemon[0];
    },

    choosePokemon(pokemon) {
      localStorage.insert<PokemonDb>(pokemon);
    },

    feedPokemon(firmness) {
      const pokemon = this.getMyPokemon();

      const isPoison = pokemon.prevMeal === firmness;

      pokemon.stats.weight += getIncreaseBy(firmness, isPoison);

      pokemon.prevMeal = firmness;

      localStorage.update(pokemon.id, pokemon);

      return pokemon;
    },

    evolvePokemon(prevPokemonId, newPokemon) {
      localStorage.remove<PokemonDb>(prevPokemonId);

      localStorage.insert<PokemonDb>(newPokemon);

      return newPokemon;
    },

    deletePokemon(id) {
      localStorage.remove<PokemonDb>(id);
    },
  };
}
