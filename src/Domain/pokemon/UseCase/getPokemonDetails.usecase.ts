import { PokemonDetail } from "@/Domain/pokemon/Model/PokemonDetail";
import { PokemonRepository } from "@/Domain/pokemon/Repository/pokemon.repository";

interface GetPokemonDetailsUseCase {
  invoke(id: number): Promise<PokemonDetail>;
}

export function getPokemonDetailUseCase(
  pokemonRepo: PokemonRepository
): GetPokemonDetailsUseCase {
  const invoke = async (id: number) => {
    const detail = await pokemonRepo.getPokemonDetail(id);

    return detail;
  };

  return {
    invoke,
  };
}
