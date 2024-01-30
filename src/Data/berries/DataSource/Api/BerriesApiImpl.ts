import { GraphQLAdapter } from "@/utils/GraphQLAdapter";
import { BerriesDataSource } from "../BerriesDataSource";
import { Data as BerriesData, BerryEntity } from "./Entity/BerryEntity";

export function berriesApiImpl(): BerriesDataSource {
  const gQL = GraphQLAdapter("https://beta.pokeapi.co/graphql/v1beta");

  const getBerries = async (
    limit: number,
    offset: number
  ): Promise<BerryEntity> => {
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

    const berries = await gQL<BerriesData, typeof variables>(query, variables);

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
