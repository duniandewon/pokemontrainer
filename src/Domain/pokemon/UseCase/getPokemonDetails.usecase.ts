import { PokemonDetail } from "@/Domain/pokemon/Model/PokemonDetail";

import { Response } from "../Model/Response";

import { PokemonRemoteRepository } from "../Repository/pokemonRemote.repository";

interface GetPokemonDetailsUseCase {
  invoke(id: number): Promise<Response<PokemonDetail>>;
}

export function getPokemonDetailUseCase(
  pokemonRepo: PokemonRemoteRepository
): GetPokemonDetailsUseCase {
  const invoke = async (id: number) => {
    const detail = await pokemonRepo.getPokemonDetail(id);

    return detail;
  };

  return {
    invoke,
  };
}
