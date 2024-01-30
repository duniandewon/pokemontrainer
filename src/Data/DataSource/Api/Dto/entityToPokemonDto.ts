import { Pokemons } from "@/Domain/Model/Pokemon";
import { PokemonEntity } from "../Entity/PokemonEntity";

export function entityToPokemonDto(pokemonEntity: PokemonEntity): Pokemons {
  return {
    data: pokemonEntity.data.pokemon_v2_pokemon.map((pokemon) => ({
      id: pokemon.id,
      name: pokemon.name,
      image:
        pokemon.pokemon_v2_pokemonsprites[0].sprites.other?.["official-artwork"]
          .front_default || "",
    })),
    meta: {
      hasNext: pokemonEntity.meta.hasNext,
      nextOffset: pokemonEntity.meta.nextOffset,
    },
    errors: pokemonEntity.errors?.map((error) => ({
      message: error.message,
      code: error.extensions.code,
    })),
  };
}
