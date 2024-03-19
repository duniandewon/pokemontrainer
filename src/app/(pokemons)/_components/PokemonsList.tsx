import { useEffect, useMemo, useRef } from "react";

import type { Pokemon } from "@/Domain/pokemon/Model/Pokemon";
import { PokemonItem } from "./PokemonItem";

interface Props {
  pokemons: Pokemon[];
  selectedPokemonId: number;
  hasNext: boolean;
  onLoadMore: () => void;
  onSelectPokemon: (pokemonId: number) => void;
}

export function PokemonsList({
  pokemons,
  selectedPokemonId,
  onLoadMore,
  onSelectPokemon,
}: Props) {
  const lastPokemonRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) onLoadMore();
    });

    if (lastPokemonRef.current) observer.observe(lastPokemonRef.current);

    return () => observer.disconnect();
  }, [onLoadMore]);

  return (
    <ul className="grid gap-4 grid-cols-[repeat(auto-fill,_minmax(100px,_1fr))] auto-rows-[minmax(100px,_1fr)]">
      {useMemo(
        () =>
          pokemons.map((pokemon, i, prevPokemons) => (
            <li
              key={pokemon.id}
              ref={prevPokemons.length - 1 === i ? lastPokemonRef : null}
              onClick={() => {
                onSelectPokemon(pokemon.id);
              }}
            >
              <PokemonItem
                pokemon={pokemon}
                isSelected={pokemon.id === selectedPokemonId}
              />
            </li>
          )),
        [pokemons, selectedPokemonId, onSelectPokemon]
      )}
    </ul>
  );
}
