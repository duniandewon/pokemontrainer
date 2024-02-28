import { useRouter } from "next/navigation";

import { useGetPokemonDetail } from "./useGetPokemonDetail";

import { choosePokemonUseCase } from "@/Domain/pokemon/UseCase/choosePokemon.usecase";

export function useChoosePokemon(choosePokemonUC = choosePokemonUseCase()) {
  const { refetch, onSelectPokemon, selectedPokemon } = useGetPokemonDetail();

  const router = useRouter();

  const onChoosePokemon = async () => {
    const { data } = await refetch();

    if (data?.data) {
      choosePokemonUC.invoke(data?.data);
      router.push("/pokemon-detail");
    }
  };

  return {
    onSelectPokemon,
    selectedPokemon,
    onChoosePokemon,
  };
}
