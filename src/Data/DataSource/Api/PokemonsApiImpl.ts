import { GraphQLAdapter } from "@/utils/GraphQLAdapter";

import { Data, PokemonEntity } from "./Entity/PokemonEntity";

import { PokemonDataSource } from "../PokemonsDataSource";

export function pokemonsApiImpl(): PokemonDataSource {
  const getPokemons = async (
    limit: number,
    offset: number,
    search: string
  ): Promise<PokemonEntity> => {
    const getPokemons = GraphQLAdapter(
      "https://beta.pokeapi.co/graphql/v1beta"
    );

    const query = `query GetPokemons($limit: Int!, $offset: Int!, $search: String) {
        pokemon_v2_pokemon(limit: $limit, offset: $offset, where: {name: {_iregex: $search}}) {
          id
          name
          pokemon_v2_pokemonsprites {
            sprites
          }
        }
      }`;

    const variables = { limit, offset, search };

    const pokemons = await getPokemons<Data, typeof variables>(
      query,
      variables
    );

    const hasNext = pokemons.data.pokemon_v2_pokemon.length >= limit;
    const nextOffset = hasNext ? offset + limit : 0;

    return {
      data: pokemons.data,
      errors: pokemons.errors,
      meta: { hasNext, nextOffset },
    };
  };

  return {
    getPokemons,
  };
}
