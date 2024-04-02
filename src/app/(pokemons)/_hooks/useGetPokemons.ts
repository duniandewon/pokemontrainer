import { useInfiniteQuery } from "@tanstack/react-query";

import {
  GetPokemonsUseCase,
  getPokemonsUseCase,
} from "@/Domain/pokemon/UseCase/getPokemons.usecase";

export function useGetPokemons(
  limit: number,
  search: string = "",
  getPokemonsUC: GetPokemonsUseCase = getPokemonsUseCase()
) {
  const fetchPokemons = async (
    limit: number,
    offset: number,
    search: string
  ) => {
    const pokemons = await getPokemonsUC.invoke(limit, offset, search);

    return pokemons;
  };

  return useInfiniteQuery({
    queryKey: ["pokemons", search],
    queryFn: ({ pageParam }) => fetchPokemons(limit, pageParam, search),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage.meta?.nextOffset || 0;
    },
  });
}
