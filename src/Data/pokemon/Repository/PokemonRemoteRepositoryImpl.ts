import { PokemonServices } from "../DataSource/remote/services/pokemonServices";
import { mapFromReomtePokemons } from "../DataSource/remote/mapper/mapFromReomtePokemons";
import { mapFromReomtePokemonDetail } from "../DataSource/remote/mapper/mapFromReomtePokemonDetail";

import { PokemonRemoteRepository } from "@/Domain/pokemon/Repository/pokemonRemote.repository";
import { pokemonsApiImpl } from "../DataSource/remote/api/PokemonApi";

export function pokemonRemoteRepositoryImpl(
  dataSource: PokemonServices = pokemonsApiImpl()
): PokemonRemoteRepository {
  const getPokemons = async (
    limit: number,
    offset: number,
    search?: string
  ) => {
    const pokemons = await dataSource.getPokemons(limit, offset, search);

    return mapFromReomtePokemons(pokemons);
  };

  const getPokemonDetail = async (id: number) => {
    const detail = await dataSource.getPokemonDetail(id);

    return mapFromReomtePokemonDetail(detail);
  };

  return {
    getPokemons,
    getPokemonDetail,
  };
}
