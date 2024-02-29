import { PokemonDetail } from "@/Domain/pokemon/Model/PokemonDetail";
import {
  EvolvePokemonUseCase,
  evolvePokemonUseCase,
} from "@/Domain/pokemon/UseCase/evolvePokemon.usecase";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useEvolvePokemon(
  prevPokemonId: number,
  evolvedPokemon: PokemonDetail,
  evolvePokemonUC: EvolvePokemonUseCase = evolvePokemonUseCase()
) {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: async () =>
      evolvePokemonUC.invoke(prevPokemonId, evolvedPokemon),
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

  const evolvePokemon = () => {
    mutate(evolvedPokemon);
  };

  return { evolvePokemon };
}
