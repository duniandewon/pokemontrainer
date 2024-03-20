import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  DeletePokemonUseCase,
  deletePokemonUseCase,
} from "@/Domain/pokemon/UseCase/deletePokemon.usecase";
import { PokemonDetail } from "@/Domain/pokemon/Model/PokemonDetail";

export function useDeletePokemon(
  deletePokemonUC: DeletePokemonUseCase = deletePokemonUseCase()
) {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: async (pokemon: PokemonDetail) => {
      return deletePokemonUC.invode(pokemon.id);
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["my-pokemon"] });

      const prevPokemon = queryClient.getQueryData<PokemonDetail>([
        "my-pokemon",
      ]);

      if (prevPokemon) {
        queryClient.setQueryData(["my-pokemon"], null);
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

  const deletePokemon = (pokemon: PokemonDetail) => {
    mutate(pokemon);
  };

  return {
    deletePokemon,
  };
}
