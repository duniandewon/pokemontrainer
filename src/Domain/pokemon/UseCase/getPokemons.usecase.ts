import { Pokemon } from "../Model/Pokemon";
import { Response } from "../Model/Response";
import { PokemonRemoteRepository } from "../Repository/pokemonRemote.repository";

interface GetPokemonsUseCase {
  invoke(
    limit: number,
    offset: number,
    search?: string
  ): Promise<Response<Pokemon[]>>;
}

export function getPokemonsUseCase(
  pokemonRepo: PokemonRemoteRepository
): GetPokemonsUseCase {
  const invoke = async (limit: number, offset: number, search: string) => {
    const pokemons = await pokemonRepo.getPokemons(limit, offset, search);

    return pokemons;
  };

  return {
    invoke,
  };
}
