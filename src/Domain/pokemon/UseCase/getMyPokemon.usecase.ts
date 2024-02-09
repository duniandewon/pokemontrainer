import { PokemonDetail } from "../Model/PokemonDetail";
import { PokemonLocalRepository } from "../Repository/pokemonLocal.repository";

interface GetMyPokemonUseCase {
  invoke(): PokemonDetail;
}

export function getMyPokemonUseCase(
  pokemonLocalRepo: PokemonLocalRepository
): GetMyPokemonUseCase {
  const invoke = () => {
    const myPokemon = pokemonLocalRepo.getMyPokemon();

    return myPokemon;
  };

  return { invoke };
}
