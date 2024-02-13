import { useRef } from "react";

import { useGetPokemons } from "./_hooks/useGetPokemons";
import { useSearch } from "./_hooks/useSearch";
import { useChoosePokemon } from "./_hooks/useChoosePokemon";

export function usePokemonsVM() {
  const limit = useRef(9999);

  const { searchDebounced, onSearchPokemons } = useSearch();

  const { pokemons, hasNext, isFetching, fetchNextPage } = useGetPokemons(
    limit.current,
    searchDebounced
  );

  const { onChoosePokemon, onSelectPokemon, selectedPokemon } =
    useChoosePokemon();

  return {
    pokemons,
    hasNext,
    isFetching,
    selectedPokemon,
    fetchNextPage,
    onChoosePokemon,
    onSearchPokemons,
    onSelectPokemon,
  };
}
