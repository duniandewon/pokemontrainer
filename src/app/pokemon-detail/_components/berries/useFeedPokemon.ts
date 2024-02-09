import {
  queryOptions,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { PokemonDetail } from "@/Domain/pokemon/Model/PokemonDetail";

export function useFeedPokemon(
  firmness: string,
  queryFn: () => PokemonDetail,
  mutationFn: (firmness: string) => Promise<PokemonDetail>
) {
  const queryClient = useQueryClient();

  const myPokemonOptions = queryOptions({
    queryKey: ["my-pokemon"],
    queryFn,
  });

  return useMutation({
    mutationFn: () => mutationFn(firmness),
    onMutate: async (pokemon: PokemonDetail) => {
      await queryClient.cancelQueries(myPokemonOptions);

      const prevPokemon = queryClient.getQueryData(myPokemonOptions.queryKey);

      if (prevPokemon)
        queryClient.setQueryData(myPokemonOptions.queryKey, pokemon);

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
