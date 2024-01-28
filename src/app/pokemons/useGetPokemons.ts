import { Pokemons } from "@/Domain/Model/Pokemon";
import { useInfiniteQuery } from "@tanstack/react-query";

export function useGetPokemons(
  limit: number,
  fetchFn: (limit: number, offset: number) => Promise<Pokemons>
) {
  return useInfiniteQuery({
    queryKey: ["pokemons"],
    queryFn: ({ pageParam }) => fetchFn(limit, pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage.meta.nextOffset;
    },
  });
}
