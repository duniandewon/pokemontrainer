import { pokemonLocalRepositoryImpl } from "@/Data/pokemon/Repository/pokemonLocalRepositoryImpl.ts";
import { PokemonLocalRepository,  } from "../Repository/pokemonLocal.repository";

export interface DeletePokemonUseCase {
  invode(id: number): void;
}

export function deletePokemonUseCase(
  pokemonLocalRepo: PokemonLocalRepository = pokemonLocalRepositoryImpl()
): DeletePokemonUseCase {
  return {
    invode(id) {
      pokemonLocalRepo.deletepokemon(id);
    },
  };
}
