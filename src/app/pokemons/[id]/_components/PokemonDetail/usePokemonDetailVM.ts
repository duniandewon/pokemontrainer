import { useCallback, useMemo } from "react";

import { useQuery } from "@tanstack/react-query";

import { pokemonsApiImpl } from "@/Data/pokemon/DataSource/Api/PokemonsApiImpl";
import { pokemonRepositoryImpl } from "@/Data/pokemon/Repository/PokemonRepositoryImpl";

import { getPokemonDetailUseCase } from "@/Domain/pokemon/UseCase/getPokemonDetails.usecase";

export function usePokemonDetailVM(id: number) {
  const pokemonsApi = useMemo(() => pokemonsApiImpl(), []);

  const pokemonsRepoImpl = useMemo(
    () => pokemonRepositoryImpl(pokemonsApi),
    [pokemonsApi]
  );

  const getPokemonDetailUC = useMemo(
    () => getPokemonDetailUseCase(pokemonsRepoImpl),
    [pokemonsRepoImpl]
  );

  const getPokemonsDetail = useCallback(
    async (id: number) => {
      return await getPokemonDetailUC.invoke(id);
    },
    [getPokemonDetailUC]
  );

  const { data, isLoading } = useQuery({
    queryKey: ["pokemon-detail", id],
    queryFn: () => getPokemonsDetail(id),
  });

  const readyToEvolve = useMemo(() => {
    if (!data) return false;

    return data.maxWeight === data.stats.weight;
  }, [data]);

  return { data, readyToEvolve, isLoading };
}
