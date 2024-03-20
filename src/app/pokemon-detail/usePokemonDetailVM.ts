import { useFeedPokemon } from "./_hooks/useFeedpokemon";
import { useGetBerries } from "./_hooks/useGetBerries";
import { useGetMyPokemon } from "../../hooks/useGetMyPokemon";
import { useEvolvePokemon } from "./_hooks/useEvolvePokemon";

import { useGetPokemonDetail } from "@/hooks/useGetPokemonDetail";
import { useDeletePokemon } from "./_hooks/useDeletePokemon";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function usePokemonDetailVM() {
  const router = useRouter();

  const { data, isFetching, readyToEvolve } = useGetMyPokemon();

  const { berries, hasNext, lastBerry } = useGetBerries();

  const { feedPokemon, setMealFirmnes } = useFeedPokemon(data);

  const { refetch } = useGetPokemonDetail(data?.nextEvolution!!);

  const { evolvePokemon } = useEvolvePokemon(data?.id!!);

  const { deletePokemon } = useDeletePokemon();

  const onEvolvePokemon = async () => {
    const { data: newPokemon } = await refetch();

    if (newPokemon?.data) {
      evolvePokemon(newPokemon.data);
    }
  };

  const onDeletepokemon = () => {
    if (data) deletePokemon(data);

    router.push("/");
  };

  useEffect(() => {
    if (!data) {
      router.push("/");
    }
  }, [data, router]);

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
    onDeletepokemon,
  };
}
