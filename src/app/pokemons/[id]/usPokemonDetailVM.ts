import { useCallback, useMemo } from "react";

import { pokemonsApiImpl } from "@/Data/DataSource/Api/PokemonsApiImpl";
import { pokemonRepositoryImpl } from "@/Data/Repository/PokemonRepositoryImpl";

import { getPokemonDetailUseCase } from "@/Domain/UseCase/getPokemonDetails.usecase";

import { useGetPokemonDetail } from "./useGetPokemonDetail";

export function usePokemonsDetailVM(id: number) {
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

  const { data, status } = useGetPokemonDetail(id, getPokemonsDetail);

  return { data, status };
}
