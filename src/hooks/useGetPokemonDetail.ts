import { useState } from "react";

import { useQuery } from "@tanstack/react-query";

import {
  GetPokemonDetailsUseCase,
  getPokemonDetailUseCase,
} from "@/Domain/pokemon/UseCase/getPokemonDetails.usecase";

export function useGetPokemonDetail(
  pokemonId: number,
  getPokemonDetailUC: GetPokemonDetailsUseCase = getPokemonDetailUseCase()
) {
  const getPokemonDetail = async (id: number) => {
    const pokemon = await getPokemonDetailUC.invoke(id);

    return pokemon;
  };

  const { refetch } = useQuery({
    queryKey: ["pokemon-detail", pokemonId],
    queryFn: () => getPokemonDetail(pokemonId),
  });

  return {
    refetch,
  };
}
