import { useRouter } from "next/navigation";

import { useGetPokemonDetail } from "./useGetPokemonDetail";

import { choosePokemonUseCase } from "@/Domain/pokemon/UseCase/choosePokemon.usecase";
import { pokemonLocalRepositoryImpl } from "@/Data/pokemon/Repository/pokemonLocalRepositoryImpl.ts";
import { pokemonDataBaseImpl } from "@/Data/pokemon/DataSource/local/db/PokemonsDatabse";

const pokemonDb = pokemonDataBaseImpl();
const pokemonLocalRepo = pokemonLocalRepositoryImpl(pokemonDb);
const choosePokemonUC = choosePokemonUseCase(pokemonLocalRepo);

export function useChoosePokemon() {
  const { refetch, onSelectPokemon, selectedPokemon } = useGetPokemonDetail();

  const router = useRouter();

  const onChoosePokemon = async () => {
    const { data } = await refetch();

    if (data?.data) {
      choosePokemonUC.invoke(data?.data);
      router.push("/pokemon-detail");
    }
  };

  return {
    onSelectPokemon,
    selectedPokemon,
    onChoosePokemon,
  };
}
