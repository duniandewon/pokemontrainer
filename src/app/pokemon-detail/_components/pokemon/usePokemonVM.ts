import { useCallback, useMemo } from "react";

import { pokemonDataBaseImpl } from "@/Data/pokemon/DataSource/local/db/PokemonsDatabse";
import { pokemonLocalRepositoryImpl } from "@/Data/pokemon/Repository/pokemonLocalRepositoryImpl.ts";

import { getMyPokemonUseCase } from "@/Domain/pokemon/UseCase/getMyPokemon.usecase";

import { useGetMyPokemon } from "./useGetMyPokemon";

const pokemonDb = pokemonDataBaseImpl();
const pokemonLocalRepo = pokemonLocalRepositoryImpl(pokemonDb);

const getMyPokemonUC = getMyPokemonUseCase(pokemonLocalRepo);

export function usePokemonVM() {
  const getMyPokemon = useCallback(() => {
    const myPokemon = getMyPokemonUC.invoke();

    return myPokemon;
  }, []);

  const { data, isFetching } = useGetMyPokemon(getMyPokemon);

  const readyToEvolve = useMemo(() => {
    if (!data) return false;

    return data.maxWeight === data.stats.weight;
  }, [data]);

  return { myPokemon: data, isFetching, readyToEvolve };
}
