import { PokemonDetail } from "@/Domain/pokemon/Model/PokemonDetail";

import { Response } from "../Model/Response";

import { PokemonRemoteRepository } from "../Repository/pokemonRemote.repository";
import { pokemonRemoteRepositoryImpl } from "@/Data/pokemon/Repository/PokemonRemoteRepositoryImpl";

export interface GetPokemonDetailsUseCase {
  invoke(id: number): Promise<Response<PokemonDetail>>;
}

export function getPokemonDetailUseCase(
  pokemonRepo: PokemonRemoteRepository = pokemonRemoteRepositoryImpl()
): GetPokemonDetailsUseCase {
  const invoke = async (id: number) => {
    const detail = await pokemonRepo.getPokemonDetail(id);

    return detail;
  };

  return {
    invoke,
  };
}
