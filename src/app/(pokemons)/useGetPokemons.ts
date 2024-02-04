import { useInfiniteQuery } from "@tanstack/react-query";

import { Pokemon } from "@/Domain/pokemon/Model/Pokemon";
import { Response } from "@/Domain/pokemon/Model/Response";

export function useGetPokemons(
  limit: number,
  search: string = "",
  fetchFn: (
    limit: number,
    offset: number,
    search: string
  ) => Promise<Response<Pokemon[]>>
) {
  return useInfiniteQuery({
    queryKey: ["pokemons", search],
    queryFn: ({ pageParam }) => fetchFn(limit, pageParam, search),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage.meta?.nextOffset || 0;
    },
  });
}
