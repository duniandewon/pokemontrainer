import { GraphQLAdapter } from "@/utils/GraphQLAdapter";

import { Data } from "../Entity/Berries";
import { BerriesServices } from "../services/BerriesServices";

export function berriesApiImpl(): BerriesServices {
  const gQL = GraphQLAdapter("https://beta.pokeapi.co/graphql/v1beta");

  const getBerries = async (limit: number, offset: number) => {
    const query = `query GetBerries($limit: Int!, $offset: Int!) {
      pokemon_v2_berry(limit: $limit, offset: $offset) {
        pokemon_v2_item {
          id
          name
          pokemon_v2_itemsprites {
            sprites
          }
        }
        pokemon_v2_berryfirmness {
          name
        }
      }
    }`;

    const variables = { limit, offset };

    const berries = await gQL<Data, typeof variables>(query, variables);

    const hasNext = berries.data.pokemon_v2_berry.length >= limit;
    const nextOffset = hasNext ? offset + limit : 0;

    return {
      data: berries.data,
      meta: {
        hasNext,
        nextOffset,
      },
    };
  };

  return {
    getBerries,
  };
}
