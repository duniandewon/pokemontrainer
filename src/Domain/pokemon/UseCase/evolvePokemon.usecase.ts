import { PokemonDetail } from "../Model/PokemonDetail";
import { Response } from "../Model/Response";
import { PokemonLocalRepository } from "../Repository/pokemonLocal.repository";

interface EvolvePokemonUseCase {
  invoke(pokemon: PokemonDetail): Promise<Response<PokemonDetail>>;
}

export function evolvePokemonUseCase(
  pokemonLocalRepo: PokemonLocalRepository
): EvolvePokemonUseCase {
  const invoke = async (pokemonDetail: PokemonDetail) => {
    const evolvedPokemon = await pokemonLocalRepo.evolvePokemon(pokemonDetail);

    return evolvedPokemon;
  };

  return {
    invoke,
  };
}
