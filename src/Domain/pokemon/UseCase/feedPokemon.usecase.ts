import { pokemonLocalRepositoryImpl } from "@/Data/pokemon/Repository/pokemonLocalRepositoryImpl.ts";
import { PokemonDetail } from "../Model/PokemonDetail";
import { PokemonLocalRepository } from "../Repository/pokemonLocal.repository";

export interface FeedPokemonUseCase {
  invoke: (firmness: string) => PokemonDetail;
}

export function feedPokemonUseCase(
  pokemonLocalRepo: PokemonLocalRepository = pokemonLocalRepositoryImpl()
): FeedPokemonUseCase {
  const invoke = (firmness: string) => {
    const pokemon = pokemonLocalRepo.feedPokemon(firmness);

    return pokemon;
  };

  return { invoke };
}
