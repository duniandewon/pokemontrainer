"use client";

import { ChangeEvent, useCallback } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { PokemonsList } from "./_components/PokemonsList";

import { usePokemonsVM } from "./usePokemonsVM";

export default function Home() {
  const {
    pokemons,
    hasNext,
    selectedPokemon,
    onSearchPokemons,
    onSelectPokemon,
    choosePokemon,
    fetchNextPage,
  } = usePokemonsVM();

  const handleOnChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => onSearchPokemons(e.target.value),
    [onSearchPokemons]
  );

  const handleChoosePokemon = useCallback(() => {
    choosePokemon();
  }, [choosePokemon]);

  const handleOnLoadMore = () => {
    fetchNextPage();
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
