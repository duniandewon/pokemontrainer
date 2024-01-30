"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import {
  ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { usePokemonsVM } from "./usePokemonsVM";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function Pokemons() {
  const { pokemons, hasNext, isFetching, fetchNextPage, onSearchPokemons } =
    usePokemonsVM();

  const [selectedPokemon, setSelectedPokemon] = useState(-1);

  const lastPokemon = useRef<HTMLLIElement>(null);

  const router = useRouter();

  const handleIntersectinObserver = useCallback(
    (enries: IntersectionObserverEntry[]) => {
      if (enries[0].isIntersecting && !isFetching) fetchNextPage();
    },
    [isFetching, fetchNextPage]
  );

  const handleOnChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => onSearchPokemons(e.target.value),
    [onSearchPokemons]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersectinObserver);

    if (lastPokemon.current) {
      observer.observe(lastPokemon.current);
    }

    return () => observer.disconnect();
  }, [handleIntersectinObserver]);

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
                      setSelectedPokemon(pokemon.id);
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
            [pokemons, hasNext, selectedPokemon]
          )}
        </ul>
      </main>
      <footer>
        <Button
          disabled={selectedPokemon < 0}
          className="w-full"
          onClick={() => router.push(`/pokemons/${selectedPokemon}`)}
        >
          Choose Me
        </Button>
      </footer>
    </div>
  );
}

export default Pokemons;
