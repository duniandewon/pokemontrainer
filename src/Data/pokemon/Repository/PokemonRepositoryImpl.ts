import { PokemonDataSource } from "../DataSource/PokemonsDataSource";
import { entityToPokemonDto } from "../DataSource/Api/Dto/entityToPokemonDto";
import { entityToPokemonDetailDto } from "../DataSource/Api/Dto/entityToPokemonDetailDto";

import { PokemonRepository } from "@/Domain/pokemon/Repository/pokemon.repository";

export function pokemonRepositoryImpl(
  dataSource: PokemonDataSource
): PokemonRepository {
  const getPokemons = async (
    limit: number,
    offset: number,
    search?: string
  ) => {
    const pokemons = await dataSource.getPokemons(limit, offset, search);

    return entityToPokemonDto(pokemons);
  };

  const getPokemonDetail = async (id: number) => {
    const detail = await dataSource.getPokemonDetail(id);

    return entityToPokemonDetailDto(detail);
  };

  return {
    getPokemons,
    getPokemonDetail,
  };
}
