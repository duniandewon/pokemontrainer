"use client";

import Image from "next/image";
import { ChangeEvent, useCallback, useEffect, useMemo, useRef } from "react";

import { usePokemonsVM } from "./usePokemonsVM";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function Pokemons() {
  const { pokemons, hasNext, isFetching, fetchNextPage, onSearchPokemons } =
    usePokemonsVM();

  const lastPokemon = useRef<HTMLLIElement>(null);

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
    <div className="h-full grid gap-4 px-4 py-5 grid-rows-[auto_1fr_auto]">
      <header>
        <Input placeholder="Search pokemons" onChange={handleOnChange} />
      </header>
      <main className="overflow-y-auto">
        <ul className="grid grid-cols-[repeat(4,_minmax(100px,_1fr))] auto-rows-[minmax(100px,_1fr)]">
          {useMemo(
            () =>
              pokemons.map((pokemon, i, prevPkemons) => (
                <li
                  key={pokemon.id}
                  ref={
                    prevPkemons.length - 1 === i && hasNext ? lastPokemon : null
                  }
                >
                  <Image
                    src={pokemon.image}
                    alt={pokemon.name}
                    width={150}
                    height={150}
                  />
                </li>
              )),
            [pokemons, hasNext]
          )}
        </ul>
      </main>
      <footer>
        <Button className="w-full">Choose Me</Button>
      </footer>
    </div>
  );
}

export default Pokemons;
