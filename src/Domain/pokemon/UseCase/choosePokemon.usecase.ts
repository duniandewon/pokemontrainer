import { pokemonLocalRepositoryImpl } from "@/Data/pokemon/Repository/pokemonLocalRepositoryImpl.ts";
import { PokemonDetail } from "../Model/PokemonDetail";
import { PokemonLocalRepository } from "../Repository/pokemonLocal.repository";

interface ChoosePokemonUseCase {
  invoke(pokmeon: PokemonDetail): void;
}

export function choosePokemonUseCase(
  pokemonLocalRepo: PokemonLocalRepository = pokemonLocalRepositoryImpl()
): ChoosePokemonUseCase {
  const invoke = (pokemonDetail: PokemonDetail) => {
    pokemonLocalRepo.choosePokemon(pokemonDetail);
  };

  return {
    invoke,
  };
}
