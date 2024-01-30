import { useQuery } from "@tanstack/react-query";

import { PokemonDetail } from "@/Domain/pokemon/Model/PokemonDetail";

export function useGetPokemonDetail(
  id: number,
  queryFn: (id: number) => Promise<PokemonDetail>
) {
  const query = useQuery({
    queryKey: ["pokemon-detail", id],
    queryFn: () => queryFn(id),
  });

  return query;
}
