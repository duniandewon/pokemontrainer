import { PokemonDetail } from "../Model/PokemonDetail";
import { PokemonLocalRepository } from "../Repository/pokemonLocal.repository";

interface FeedPokemonUseCase {
  invoke: (firmness: string) => PokemonDetail;
}

export function feedPokemonUseCase(
  pokemonLocalRepo: PokemonLocalRepository
): FeedPokemonUseCase {
  const invoke = (firmness: string) => {
    const pokemon = pokemonLocalRepo.feedPokemon(firmness);

    return pokemon;
  };

  return { invoke };
}
