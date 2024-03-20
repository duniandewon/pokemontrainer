import { useFeedPokemon } from "./_hooks/useFeedpokemon";
import { useGetBerries } from "./_hooks/useGetBerries";
import { useGetMyPokemon } from "../../hooks/useGetMyPokemon";
import { useEvolvePokemon } from "./_hooks/useEvolvePokemon";

import { useGetPokemonDetail } from "@/hooks/useGetPokemonDetail";

export function usePokemonDetailVM() {
  const { data, isFetching, readyToEvolve } = useGetMyPokemon();

  const { berries, hasNext, lastBerry } = useGetBerries();

  const { feedPokemon, setMealFirmnes } = useFeedPokemon(data);

  const { refetch } = useGetPokemonDetail(data?.nextEvolution!!);

  const { evolvePokemon } = useEvolvePokemon(data?.id!!);

  const onEvolvePokemon = async () => {
    const { data: newPokemon } = await refetch();

    if (newPokemon?.data) {
      evolvePokemon(newPokemon.data);
    }
  };

  return {
    data,
    readyToEvolve,
    isFetching,
    berries,
    hasNext,
    lastBerry,
    feedPokemon,
    setMealFirmnes,
    onEvolvePokemon,
  };
}
