import { useState } from "react";

import { useQuery } from "@tanstack/react-query";

import { getPokemonDetailUseCase } from "@/Domain/pokemon/UseCase/getPokemonDetails.usecase";
import { pokemonRemoteRepositoryImpl } from "@/Data/pokemon/Repository/PokemonRemoteRepositoryImpl";
import { pokemonsApiImpl } from "@/Data/pokemon/DataSource/remote/api/PokemonApi";

const pokmeonsApi = pokemonsApiImpl();
const pokemonsRemoteRepo = pokemonRemoteRepositoryImpl(pokmeonsApi);
const getPokemonDetailUC = getPokemonDetailUseCase(pokemonsRemoteRepo);

export function useGetPokemonDetail() {
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
