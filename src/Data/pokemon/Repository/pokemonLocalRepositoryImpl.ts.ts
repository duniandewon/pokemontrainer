import { pokemonDao } from "../DataSource/local/dao/pokemonDao";

import { PokemonLocalRepository } from "@/Domain/pokemon/Repository/pokemonLocal.repository";
import { mapFromLocal } from "../DataSource/local/mapper/pokemonLocalMapper";

export function pokemonLocalRepositoryImpl(
  pokemonDao: pokemonDao
): PokemonLocalRepository {
  return {
    getMyPokemon() {
      const myPokemon = pokemonDao.getMyPokemon();

      return mapFromLocal(myPokemon);
    },
    choosePokemon(pokemon) {
      pokemonDao.choosePokemon(pokemon);
    },

    feedPokemon(firmness) {
      const pokemon = pokemonDao.feedPokemon(firmness);

      return mapFromLocal(pokemon);
    },

    evolvePokemon(prevPokemonId, evolveToPokemon) {
      const evolvedPokemon = pokemonDao.evolvePokemon(
        prevPokemonId,
        evolveToPokemon
      );

      return evolvedPokemon;
    },
  };
}
