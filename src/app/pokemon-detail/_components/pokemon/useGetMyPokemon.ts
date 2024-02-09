import { PokemonDetail } from "@/Domain/pokemon/Model/PokemonDetail";
import { queryOptions, useQuery } from "@tanstack/react-query";

export function useGetMyPokemon(queryFn: () => PokemonDetail) {
  return useQuery({
    queryKey: ["my-pokemon"],
    queryFn: () => queryFn(),
  });
}