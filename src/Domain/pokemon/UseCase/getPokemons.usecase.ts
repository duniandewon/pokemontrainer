import { Pokemons } from "../Model/Pokemon";

import { PokemonRepository } from "../Repository/pokemon.repository";

interface GetPokemonsUseCase {
  invoke(limit: number, offset: number, search?: string): Promise<Pokemons>;
}

export function getPokemonsUseCase(
  pokemonRepo: PokemonRepository
): GetPokemonsUseCase {
  const invoke = async (limit: number, offset: number, search: string) => {
    const pokemons = await pokemonRepo.getPokemons(limit, offset, search);

    return pokemons;
  };

  return {
    invoke,
  };
}
