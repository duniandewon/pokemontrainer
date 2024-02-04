import { GraphQLAdapter } from "@/utils/GraphQLAdapter";

import { Data as PokemonsData } from "../Entity/PokemonEntity";

import { Data as PokemonDetailData } from "../Entity/PokemonDetailsEntity";

import { PokemonServices } from "../services/pokemonServices";

export function pokemonsApiImpl(): PokemonServices {
  const gQL = GraphQLAdapter("https://beta.pokeapi.co/graphql/v1beta");

  return {
    async getPokemons(limit, offset, search) {
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
        meta: { hasNext, nextOffset },
        errors: pokemons.errors,
      };
    },
    async getPokemonDetail(id) {
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

      const { data, errors } = await gQL<PokemonDetailData, typeof variables>(
        query,
        variables
      );

      return {
        data,
        errors: errors,
      };
    },
  };
}
