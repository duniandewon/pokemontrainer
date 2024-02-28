import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { PokemonDetail } from "@/Domain/pokemon/Model/PokemonDetail";

export function useFeedPokemon(
  firmness: string,
  mutationFn: (firmness: string) => Promise<PokemonDetail>
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => mutationFn(firmness),
    onMutate: async (pokemon: PokemonDetail) => {
      await queryClient.cancelQueries({ queryKey: ["my-pokemon"] });

      const prevPokemon = queryClient.getQueryData<PokemonDetail>([
        "my-pokemon",
      ]);

      if (prevPokemon) queryClient.setQueryData(["my-pokemon"], pokemon);

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
}
