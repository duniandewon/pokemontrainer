import { PokemonDetail } from "../Model/PokemonDetail";
import { Response } from "../Model/Response";
import { PokemonLocalRepository } from "../Repository/pokemonLocal.repository";

interface ChoosePokemonUseCase {
  invoke(pokmeon: PokemonDetail): Promise<Response<null>>;
}

export function choosePokemonUseCase(
  pokemonLocalRepo: PokemonLocalRepository
): ChoosePokemonUseCase {
  const invoke = async (pokemonDetail: PokemonDetail) => {
    const res = await pokemonLocalRepo.choosePokemon(pokemonDetail);

    return res;
  };
  return {
    invoke,
  };
}
