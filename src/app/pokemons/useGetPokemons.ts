import { Pokemons } from "@/Domain/Model/Pokemon";
import { useInfiniteQuery } from "@tanstack/react-query";

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
