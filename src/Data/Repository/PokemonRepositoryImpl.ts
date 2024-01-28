import { PokemonDataSource } from "../DataSource/PokemonsDataSource";
import { entityToPokemonDto } from "../DataSource/Api/Dto/entityToPokemonDto";

import { PokemonRepository } from "@/Domain/Repository/pokemon.repository";

export function pokemonRepositoryImpl(
  dataSource: PokemonDataSource
): PokemonRepository {
  return {
    async getPokemons(limit, offset, search) {
      const pokemons = await dataSource.getPokemons(limit, offset, search);

      return entityToPokemonDto(pokemons);
    },
  };
}
