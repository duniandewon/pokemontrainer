import { useCallback, useMemo, useRef, useState } from "react";

import { pokemonsApiImpl } from "@/Data/pokemon/DataSource/Api/PokemonsApiImpl";
import { pokemonRepositoryImpl } from "@/Data/pokemon/Repository/PokemonRepositoryImpl";

import { getPokemonsUseCase } from "@/Domain/pokemon/UseCase/getPokemons.usecase";

import { useGetPokemons } from "./useGetPokemons";
import useDebounce from "./useDebounce";

export function usePokemonsVM() {
  const pokemonsApi = useMemo(() => pokemonsApiImpl(), []);

  const pokemonsRepoImpl = useMemo(
    () => pokemonRepositoryImpl(pokemonsApi),
    [pokemonsApi]
  );

  const getPokemonsUC = useMemo(
    () => getPokemonsUseCase(pokemonsRepoImpl),
    [pokemonsRepoImpl]
  );

  const limit = useRef(40);

  const [search, setSearch] = useState("");

  const searchDebounced = useDebounce(search, 1000);

  const fetchPokemons = useCallback(
    async (limit: number, offset: number, search: string) => {
      const pokemons = await getPokemonsUC.invoke(limit, offset, search);

      return pokemons;
    },
    [getPokemonsUC]
  );

  const onSearchPokemons = useCallback((search: string) => {
    setSearch(search);
  }, []);

  const { data, isFetching, fetchNextPage } = useGetPokemons(
    limit.current,
    searchDebounced,
    fetchPokemons
  );

  const pokemons = useMemo(
    () => (data?.pages ? data.pages.map((page) => page.data).flat() : []),
    [data?.pages]
  );

  const hasNext = useMemo(() => data?.pages[0].meta.hasNext, [data?.pages]);

  return { pokemons, hasNext, isFetching, fetchNextPage, onSearchPokemons };
}
