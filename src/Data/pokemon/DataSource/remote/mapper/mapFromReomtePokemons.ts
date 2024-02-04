import { Data } from "../Entity/PokemonEntity";
import { PokemonResponse } from "../Entity/PokemonResponse";

import { Pokemon } from "@/Domain/pokemon/Model/Pokemon";
import { Response } from "@/Domain/pokemon/Model/Response";

export function mapFromReomtePokemons(
  pokemonEntity: PokemonResponse<Data>
): Response<Pokemon[]> {
  return {
    data: pokemonEntity.data.pokemon_v2_pokemon.map((pokemon) => ({
      id: pokemon.id,
      name: pokemon.name,
      image:
        pokemon.pokemon_v2_pokemonsprites[0].sprites.other?.["official-artwork"]
          .front_default || "",
    })),
    meta: {
      hasNext: pokemonEntity.meta?.hasNext || false,
      nextOffset: pokemonEntity.meta?.nextOffset || 0,
    },
    errors: pokemonEntity.errors?.map((error) => ({
      message: error.message,
      code: error.extensions.code,
    })),
  };
}
