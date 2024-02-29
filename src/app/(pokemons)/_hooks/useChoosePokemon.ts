import { useRouter } from "next/navigation";

import { choosePokemonUseCase } from "@/Domain/pokemon/UseCase/choosePokemon.usecase";

import { PokemonDetail } from "@/Domain/pokemon/Model/PokemonDetail";

export function useChoosePokemon(choosePokemonUC = choosePokemonUseCase()) {
  const router = useRouter();

  const onChoosePokemon = (pokemon: PokemonDetail) => {
    choosePokemonUC.invoke(pokemon);

    router.push("/pokemon-detail");
  };

  return {
    onChoosePokemon,
  };
}
