import { useRef, useState } from "react";

import { useGetPokemons } from "./_hooks/useGetPokemons";
import { useSearch } from "./_hooks/useSearch";
import { useChoosePokemon } from "./_hooks/useChoosePokemon";
import { useGetPokemonDetail } from "@/hooks/useGetPokemonDetail";

export function usePokemonsVM() {
  const limit = useRef(40);

  const [selectedPokemon, setSelectedPokemon] = useState(0);

  const { searchDebounced, onSearchPokemons } = useSearch();

  const { pokemons, hasNext, isFetching, fetchNextPage } = useGetPokemons(
    limit.current,
    searchDebounced
  );

  const { refetch } = useGetPokemonDetail(selectedPokemon);

  const onSelectPokemon = (id: number) => setSelectedPokemon(id);

  const { onChoosePokemon } = useChoosePokemon();

  const choosePokemon = async () => {
    const { data } = await refetch();

    if (data?.data) {
      onChoosePokemon(data.data);
    }
  };

  return {
    pokemons,
    hasNext,
    isFetching,
    selectedPokemon,
    fetchNextPage,
    choosePokemon,
    onSearchPokemons,
    onSelectPokemon,
  };
}
