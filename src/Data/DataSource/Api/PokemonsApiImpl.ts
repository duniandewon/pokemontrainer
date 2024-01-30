import { GraphQLAdapter } from "@/utils/GraphQLAdapter";

import { Data as PokemonsData, PokemonEntity } from "./Entity/PokemonEntity";
import {
  Data as PokemonDetailData,
  PokemonDetailEntity,
} from "./Entity/PokemonDetailsEntity";

import { PokemonDataSource } from "../PokemonsDataSource";

export function pokemonsApiImpl(): PokemonDataSource {
  const gQL = GraphQLAdapter("https://beta.pokeapi.co/graphql/v1beta");

  const getPokemons = async (
    limit: number,
    offset: number,
    search: string
  ): Promise<PokemonEntity> => {
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

    const pokemons = await gQL<PokemonsData, typeof variables>(
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

  const getPokemonDetail = async (id: number): Promise<PokemonDetailEntity> => {
    const query = `query GetPokemonDetail($id: Int! = 1) {
      pokemon_v2_pokemon(where: {id: {_eq: $id}}) {
        id
        name
        weight
        pokemon_v2_pokemonstats {
          base_stat
          pokemon_v2_stat {
            name
          }
        }
        pokemon_v2_pokemonsprites {
          sprites
        }
      }
      pokemon_v2_pokemonspecies(where: {evolves_from_species_id: {_eq: $id}}) {
        pokemon_v2_pokemons {
          id
          name
          weight
        }
      }
    }`;

    const variables = { id };

    const { data } = await gQL<PokemonDetailData, typeof variables>(
      query,
      variables
    );

    return {
      data,
    };
  };

  return {
    getPokemons,
    getPokemonDetail,
  };
}
