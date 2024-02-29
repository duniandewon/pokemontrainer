import { pokemonLocalRepositoryImpl } from "@/Data/pokemon/Repository/pokemonLocalRepositoryImpl.ts";
import { PokemonDetail } from "../Model/PokemonDetail";
import { PokemonLocalRepository } from "../Repository/pokemonLocal.repository";

export interface EvolvePokemonUseCase {
  invoke(prevPokemonId: number, evolveToPokemon: PokemonDetail): PokemonDetail;
}

export function evolvePokemonUseCase(
  pokemonLocalRepo: PokemonLocalRepository = pokemonLocalRepositoryImpl()
): EvolvePokemonUseCase {
  const invoke = (prevPokemonId: number, evolveToPokemon: PokemonDetail) => {
    const evolvedPokemon = pokemonLocalRepo.evolvePokemon(
      prevPokemonId,
      evolveToPokemon
    );

    return evolvedPokemon;
  };

  return {
    invoke,
  };
}
