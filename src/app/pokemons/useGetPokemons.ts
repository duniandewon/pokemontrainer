import { useInfiniteQuery } from "@tanstack/react-query";

import { Pokemons } from "@/Domain/pokemon/Model/Pokemon";

export function useGetPokemons(
  limit: number,
  search: string = "",
  fetchFn: (limit: number, offset: number, search: string) => Promise<Pokemons>
) {
  return useInfiniteQuery({
    queryKey: ["pokemons", search],
    queryFn: ({ pageParam }) => fetchFn(limit, pageParam, search),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage.meta.nextOffset;
    },
  });
}
