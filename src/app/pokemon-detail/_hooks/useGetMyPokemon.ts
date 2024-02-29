import {
  GetMyPokemonUseCase,
  getMyPokemonUseCase,
} from "@/Domain/pokemon/UseCase/getMyPokemon.usecase";
import { useQuery } from "@tanstack/react-query";

export function useGetMyPokemon(
  getMyPokemonUC: GetMyPokemonUseCase = getMyPokemonUseCase()
) {
  const getMyPokemon = () => {
    return getMyPokemonUC.invoke();
  };

  return useQuery({
    queryKey: ["my-pokemon"],
    queryFn: () => getMyPokemon(),
  });
}
