import { useCallback, useMemo, useRef } from "react";

import { pokemonsApiImpl } from "@/Data/DataSource/Api/PokemonsApiImpl";
import { pokemonRepositoryImpl } from "@/Data/Repository/PokemonRepositoryImpl";

import { getPokemonsUseCase } from "@/Domain/UseCase/getPokemons.usecase";
import { useGetPokemons } from "./useGetPokemons";

export function usePokemonsVM() {
  const limit = useRef(40);

  const pokemonsApi = useMemo(() => pokemonsApiImpl(), []);
  const pokemonsRepo = useMemo(
    () => pokemonRepositoryImpl(pokemonsApi),
    [pokemonsApi]
  );

  const getPokemonsUC = useMemo(
    () => getPokemonsUseCase(pokemonsRepo),
    [pokemonsRepo]
  );

  const fetchPokemons = useCallback(
    async (limit: number, offset: number) => {
      const pokemons = await getPokemonsUC.invoke(limit, offset, "");

      return pokemons;
    },
    [getPokemonsUC]
  );

  const { data, isFetching, fetchNextPage } = useGetPokemons(
    limit.current,
    fetchPokemons
  );

  const pokemons = useMemo(
    () => (data?.pages ? data.pages.map((page) => page.data).flat() : []),
    [data?.pages]
  );

  return { pokemons, isFetching, fetchNextPage };
}
