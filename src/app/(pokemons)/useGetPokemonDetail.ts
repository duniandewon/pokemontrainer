import { PokemonDetail } from "@/Domain/pokemon/Model/PokemonDetail";
import { Response } from "@/Domain/pokemon/Model/Response";
import { useQuery } from "@tanstack/react-query";

export function useGetPokemonDetail(
  id: number,
  queryFn: (id: number) => Promise<Response<PokemonDetail>>
) {
  return useQuery({
    queryKey: ["pokemon-detail", id],
    queryFn: () => queryFn(id),
    enabled: false,
  });
}
