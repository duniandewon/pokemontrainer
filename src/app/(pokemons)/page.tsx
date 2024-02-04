"use client";

import Image from "next/image";

import { ChangeEvent, useCallback, useMemo } from "react";

import { usePokemonsVM } from "./usePokemonsVM";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Home() {
  const {
    pokemons,
    hasNext,
    selectedPokemon,
    lastPokemon,
    onSearchPokemons,
    onSelectPokemon,
    onChoosePokemon,
  } = usePokemonsVM();

  const handleOnChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => onSearchPokemons(e.target.value),
    [onSearchPokemons]
  );

  const handleChoosePokemon = useCallback(() => {
    onChoosePokemon();
  }, [onChoosePokemon]);

  return (
    <div className="h-full px-4 py-5 grid grid-rows-[auto_1fr_auto] gap-4">
      <header>
        <Input placeholder="Search pokemons" onChange={handleOnChange} />
      </header>
      <main className="overflow-y-auto">
        <ul className="grid gap-4 grid-cols-[repeat(auto-fill,_minmax(100px,_1fr))] auto-rows-[minmax(100px,_1fr)]">
          {useMemo(
            () =>
              pokemons.map((pokemon, i, prevPkemons) => (
                <li
                  key={pokemon.id}
                  ref={
                    prevPkemons.length - 1 === i && hasNext ? lastPokemon : null
                  }
                >
                  <div
                    onClick={() => {
                      onSelectPokemon(pokemon.id);
                    }}
                    className={`cursor-pointer border hover:border-slate-300 p-2 ${
                      selectedPokemon === pokemon.id
                        ? "border-slate-300"
                        : "border-transparent"
                    }`}
                  >
                    <Image
                      src={pokemon.image}
                      alt={pokemon.name}
                      width={150}
                      height={150}
                    />
                  </div>
                </li>
              )),
            [pokemons, selectedPokemon, lastPokemon, hasNext, onSelectPokemon]
          )}
        </ul>
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
