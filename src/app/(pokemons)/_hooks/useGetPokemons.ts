import { useCallback, useMemo } from "react";

import { useInfiniteQuery } from "@tanstack/react-query";

import { getPokemonsUseCase } from "@/Domain/pokemon/UseCase/getPokemons.usecase";
import { pokemonRemoteRepositoryImpl } from "@/Data/pokemon/Repository/PokemonRemoteRepositoryImpl";
import { pokemonsApiImpl } from "@/Data/pokemon/DataSource/remote/api/PokemonApi";

const pokmeonsApi = pokemonsApiImpl();
const pokemonsRemoteRepo = pokemonRemoteRepositoryImpl(pokmeonsApi);
const getPokemonsUC = getPokemonsUseCase(pokemonsRemoteRepo);

export function useGetPokemons(limit: number, search: string = "") {
  const fetchPokemons = useCallback(
    async (limit: number, offset: number, search: string) => {
      const pokemons = await getPokemonsUC.invoke(limit, offset, search);

      return pokemons;
    },
    []
  );

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

  const hasNext = useMemo(() => data?.pages[0].meta?.hasNext || false, [data?.pages]);

  return {
    pokemons,
    hasNext,
    isFetching,
    fetchNextPage,
  };
}
