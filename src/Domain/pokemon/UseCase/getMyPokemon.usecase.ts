import { pokemonLocalRepositoryImpl } from "@/Data/pokemon/Repository/pokemonLocalRepositoryImpl.ts";
import { PokemonDetail } from "../Model/PokemonDetail";
import { PokemonLocalRepository } from "../Repository/pokemonLocal.repository";

export interface GetMyPokemonUseCase {
  invoke(): PokemonDetail;
}

export function getMyPokemonUseCase(
  pokemonLocalRepo: PokemonLocalRepository = pokemonLocalRepositoryImpl()
): GetMyPokemonUseCase {
  const invoke = () => {
    const myPokemon = pokemonLocalRepo.getMyPokemon();

    return myPokemon;
  };

  return { invoke };
}
