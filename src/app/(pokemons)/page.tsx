"use client";

import { ChangeEvent } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { PokemonsList } from "./_components/PokemonsList";
import { PokemonsListSekeleton } from "./_components/PokemonsListSekeleton";

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
    isFetching,
  } = usePokemonsVM();

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    onSearchPokemons(e.target.value);
  };

  const handleChoosePokemon = () => {
    choosePokemon();
  };

  const handleOnLoadMore = () => {
    hasNext && fetchNextPage();
  };

  return (
    <div className="h-full px-4 py-5 grid grid-rows-[auto_1fr_auto] gap-4">
      <header>
        <Input
          name="search-pokemon"
          placeholder="Search pokemons"
          onChange={handleOnChange}
          disabled={isFetching}
        />
      </header>
      <main className="overflow-y-auto">
        <PokemonsList
          pokemons={pokemons}
          onLoadMore={handleOnLoadMore}
          onSelectPokemon={onSelectPokemon}
          selectedPokemonId={selectedPokemon}
        />
        {isFetching && <PokemonsListSekeleton />}
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
