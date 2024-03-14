"use client";

import { useRouter } from "next/navigation";
import { ChangeEvent } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { PokemonsList } from "./_components/PokemonsList";

import { usePokemonsVM } from "./usePokemonsVM";

export default function Home() {
  const router = useRouter();

  const {
    pokemons,
    hasNext,
    selectedPokemon,
    onSearchPokemons,
    onSelectPokemon,
    choosePokemon,
    fetchNextPage,
  } = usePokemonsVM();

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) =>
    onSearchPokemons(e.target.value);

  const handleChoosePokemon = () => {
    choosePokemon();

    router.push("/pokemon-detail");
  };

  const handleOnLoadMore = () => {
    hasNext && fetchNextPage();
  };

  return (
    <div className="h-full px-4 py-5 grid grid-rows-[auto_1fr_auto] gap-4">
      <header>
        <Input placeholder="Search pokemons" onChange={handleOnChange} />
      </header>
      <main className="overflow-y-auto">
        <PokemonsList
          pokemons={pokemons}
          hasNext={hasNext}
          onLoadMore={handleOnLoadMore}
          onSelectPokemon={onSelectPokemon}
          selectedPokemonId={selectedPokemon}
        />
      </main>
      <footer>
        <Button
          className="w-full"
          disabled={selectedPokemon < 0}
          onClick={handleChoosePokemon}
        >
          Choose Me
        </Button>
      </footer>
    </div>
  );
}
