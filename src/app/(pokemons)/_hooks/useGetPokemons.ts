import { useMemo } from "react";

import { useInfiniteQuery } from "@tanstack/react-query";

import { GetPokemonsUseCase, getPokemonsUseCase } from "@/Domain/pokemon/UseCase/getPokemons.usecase";

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

  const { data, isFetching, fetchNextPage } = useInfiniteQuery({
    queryKey: ["pokemons", search],
    queryFn: ({ pageParam }) => fetchPokemons(limit, pageParam, search),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage.meta?.nextOffset || 0;
    },
  });

  const pokemons = useMemo(
    () => (data?.pages ? data.pages.map((page) => page.data).flat() : []),
    [data?.pages]
  );

  const hasNext = useMemo(
    () => data?.pages[0].meta?.hasNext || false,
    [data?.pages]
  );

  return {
    pokemons,
    hasNext,
    isFetching,
    fetchNextPage,
  };
}
