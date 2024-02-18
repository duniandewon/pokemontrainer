import { useState } from "react";

import { useQuery } from "@tanstack/react-query";

import {
  GetPokemonDetailsUseCase,
  getPokemonDetailUseCase,
} from "@/Domain/pokemon/UseCase/getPokemonDetails.usecase";

export function useGetPokemonDetail(
  getPokemonDetailUC: GetPokemonDetailsUseCase = getPokemonDetailUseCase()
) {
  const [selectedPokemon, setSelectedPokemon] = useState(-1);

  const getPokemonDetail = async (id: number) => {
    const pokemon = await getPokemonDetailUC.invoke(id);

    return pokemon;
  };

  const { refetch } = useQuery({
    queryKey: ["pokemon-detail", selectedPokemon],
    queryFn: () => getPokemonDetail(selectedPokemon),
    enabled: false,
  });

  const onSelectPokemon = (id: number) => {
    setSelectedPokemon(id);
  };

  return {
    selectedPokemon,
    onSelectPokemon,
    refetch,
  };
}
