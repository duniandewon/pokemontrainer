"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef } from "react";

import { usePokemonsVM } from "./usePokemonsVM";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function Pokemons() {
  const { pokemons, isFetching, fetchNextPage } = usePokemonsVM();

  const lastPokemon = useRef<HTMLLIElement>(null);

  const handleIntersectinObserver = useCallback(
    (enries: IntersectionObserverEntry[]) => {
      if (enries[0].isIntersecting && !isFetching) fetchNextPage();
    },
    [isFetching, fetchNextPage]
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
        <Input placeholder="Search pokemons" />
      </header>
      <main className="overflow-y-auto">
        <ul className="grid grid-cols-[repeat(4,_minmax(100px,_1fr))] auto-rows-[minmax(100px,_1fr)]">
          {useMemo(
            () =>
              pokemons.map((pokemon, i, prevPkemons) => (
                <li
                  key={pokemon.id}
                  ref={prevPkemons.length - 1 === i ? lastPokemon : null}
                >
                  <Image
                    src={pokemon.image}
                    alt={pokemon.name}
                    width={150}
                    height={150}
                  />
                </li>
              )),
            [pokemons]
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
