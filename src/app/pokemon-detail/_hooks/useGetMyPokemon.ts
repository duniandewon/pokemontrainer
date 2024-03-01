import { useMemo } from "react";

import { useQuery } from "@tanstack/react-query";

import {
  GetMyPokemonUseCase,
  getMyPokemonUseCase,
} from "@/Domain/pokemon/UseCase/getMyPokemon.usecase";

export function useGetMyPokemon(
  getMyPokemonUC: GetMyPokemonUseCase = getMyPokemonUseCase()
) {
  const getMyPokemon = () => {
    return getMyPokemonUC.invoke();
  };

  const { data, isFetching } = useQuery({
    queryKey: ["my-pokemon"],
    queryFn: () => getMyPokemon(),
  });

  const readyToEvolve = useMemo(() => {
    if (!data) return false;

    return data.stats.weight >= data.maxWeight && data.nextEvolution > 0;
  }, [data]);

  return {
    data,
    isFetching,
    readyToEvolve,
  };
}
