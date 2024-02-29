import { useMemo } from "react";
import { useFeedPokemon } from "./_hooks/useFeedpokemon";
import { useGetBerries } from "./_hooks/useGetBerries";
import { useGetMyPokemon } from "./_hooks/useGetMyPokemon";

export function usePokemonDetailVM() {
  const { data, isFetching } = useGetMyPokemon();

  const { berries, hasNext, lastBerry } = useGetBerries();

  const { feedPokemon, setMealFirmnes } = useFeedPokemon(data);

  const readyToEvolve = useMemo(() => {
    if (!data) return false;

    return data?.stats.weight >= data?.maxWeight;
  }, [data]);

  return {
    data,
    readyToEvolve,
    isFetching,
    berries,
    hasNext,
    lastBerry,
    feedPokemon,
    setMealFirmnes,
  };
}
