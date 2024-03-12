import { choosePokemonUseCase } from "@/Domain/pokemon/UseCase/choosePokemon.usecase";

import { PokemonDetail } from "@/Domain/pokemon/Model/PokemonDetail";

export function useChoosePokemon(choosePokemonUC = choosePokemonUseCase()) {
  const onChoosePokemon = (pokemon: PokemonDetail) => {
    choosePokemonUC.invoke(pokemon);
  };

  return {
    onChoosePokemon,
  };
}
