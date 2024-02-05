import { pokemonDao } from "../DataSource/local/dao/pokemonDao";

import { PokemonLocalRepository } from "@/Domain/pokemon/Repository/pokemonLocal.repository";

export function pokemonLocalRepositoryImpl(
  pokemonDao: pokemonDao
): PokemonLocalRepository {
  return {
    choosePokemon(pokemon) {
      pokemonDao.choosePokemon(pokemon);
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
