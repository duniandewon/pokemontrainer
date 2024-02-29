import { useState } from "react";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { PokemonDetail } from "@/Domain/pokemon/Model/PokemonDetail";
import {
  FeedPokemonUseCase,
  feedPokemonUseCase,
} from "@/Domain/pokemon/UseCase/feedPokemon.usecase";

export function useFeedPokemon(
  pokemonToFeed?: PokemonDetail,
  feedPokemonUC: FeedPokemonUseCase = feedPokemonUseCase()
) {
  const [mealFirmnes, setMealFirmnes] = useState("");

  const queryClient = useQueryClient();

  const feedPokemonMutation = async (firmness: string) => {
    return new Promise<PokemonDetail>((resolve) => {
      const pokemon = feedPokemonUC.invoke(firmness);
      resolve(pokemon);
    });
  };

  const { mutate } = useMutation({
    mutationFn: () => feedPokemonMutation(mealFirmnes),
    onMutate: async (pokemon: PokemonDetail) => {
      await queryClient.cancelQueries({ queryKey: ["my-pokemon"] });

      const prevPokemon = queryClient.getQueryData<PokemonDetail>([
        "my-pokemon",
      ]);

      if (prevPokemon) {
        queryClient.setQueryData(["my-pokemon"], pokemon);
      }

      return { prevPokemon };
    },
    onError: (err, variables, context) => {
      if (context?.prevPokemon)
        queryClient.setQueryData<PokemonDetail>(
          ["my-pokemon"],
          context.prevPokemon
        );
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["my-pokemon"] });
    },
  });

  const feedPokemon = () => {
    if (pokemonToFeed) mutate(pokemonToFeed);
  };

  return {
    feedPokemon,
    setMealFirmnes,
  };
}
