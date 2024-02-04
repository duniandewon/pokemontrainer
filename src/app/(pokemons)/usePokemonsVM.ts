import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { useGetPokemons } from "./useGetPokemons";
import useDebounce from "./useDebounce";

import { getPokemonsUseCase } from "@/Domain/pokemon/UseCase/getPokemons.usecase";

import { pokemonRemoteRepositoryImpl } from "@/Data/pokemon/Repository/PokemonRemoteRepositoryImpl";
import { pokemonsApiImpl } from "@/Data/pokemon/DataSource/remote/api/PokemonApi";
import { getPokemonDetailUseCase } from "@/Domain/pokemon/UseCase/getPokemonDetails.usecase";
import { useGetPokemonDetail } from "./useGetPokemonDetail";

const pokmeonsApi = pokemonsApiImpl();
const pokemonsRemoteRepo = pokemonRemoteRepositoryImpl(pokmeonsApi);

const getPokemonsUC = getPokemonsUseCase(pokemonsRemoteRepo);
const getPokemonDetailUC = getPokemonDetailUseCase(pokemonsRemoteRepo);

export function usePokemonsVM() {
  const [search, setSearch] = useState("");
  const [selectedPokemon, setSelectedPokemon] = useState(-1);

  const limit = useRef(40);
  const lastPokemon = useRef<HTMLLIElement>(null);

  const searchDebounced = useDebounce(search, 1000);

  const fetchPokemons = useCallback(
    async (limit: number, offset: number, search: string) => {
      const pokemons = await getPokemonsUC.invoke(limit, offset, search);

      return pokemons;
    },
    []
  );

  const getPokemonDetail = useCallback(async (id: number) => {
    const pokemon = await getPokemonDetailUC.invoke(id);

    return pokemon;
  }, []);

  const {
    data: pokemonsData,
    isFetching,
    fetchNextPage,
  } = useGetPokemons(limit.current, searchDebounced, fetchPokemons);

  const { data: pokemonDetailData, isFetching: isFetchingPokemonDetail, refetch } = useGetPokemonDetail(
    selectedPokemon,
    getPokemonDetail
  );

  const onSearchPokemons = useCallback((search: string) => {
    setSearch(search);
  }, []);

  const onSelectPokemon = useCallback(
    (id: number) => setSelectedPokemon(id),
    []
  );

  const onChoosePokemon = useCallback(() => {
    refetch();
  }, [refetch]);

  const pokemons = useMemo(
    () =>
      pokemonsData?.pages
        ? pokemonsData.pages.map((page) => page.data).flat()
        : [],
    [pokemonsData?.pages]
  );

  const hasNext = useMemo(
    () => pokemonsData?.pages[0].meta?.hasNext,
    [pokemonsData?.pages]
  );

  useEffect(() => {
    const intersectionObserverCb = (enries: IntersectionObserverEntry[]) => {
      if (enries[0].isIntersecting && !isFetching) fetchNextPage();
    };

    const observer = new IntersectionObserver(intersectionObserverCb);

    if (lastPokemon.current) {
      observer.observe(lastPokemon.current);
    }

    return () => observer.disconnect();
  }, [isFetching, fetchNextPage]);

  return {
    pokemons,
    hasNext,
    isFetching,
    selectedPokemon,
    lastPokemon,
    fetchNextPage,
    onChoosePokemon,
    onSearchPokemons,
    onSelectPokemon,
  };
}
