import { useMutation, useQueryClient } from "@tanstack/react-query";

import { choosePokemonUseCase } from "@/Domain/pokemon/UseCase/choosePokemon.usecase";

import { PokemonDetail } from "@/Domain/pokemon/Model/PokemonDetail";

export function useChoosePokemon(choosePokemonUC = choosePokemonUseCase()) {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: async (pokemon: PokemonDetail) => {
      choosePokemonUC.invoke(pokemon);
    },
    onMutate: async (pokemon) => {
      await queryClient.cancelQueries({ queryKey: ["my-pokemon"] });

      const prevPokemon = queryClient.getQueryData<PokemonDetail>([
        "my-pokemon",
      ]);

      console.log("pokemon: ", pokemon);

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

  const onChoosePokemon = (pokemon: PokemonDetail) => {
    mutate(pokemon);
  };

  return {
    onChoosePokemon,
  };
}
