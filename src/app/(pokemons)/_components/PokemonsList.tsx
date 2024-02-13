import { useMemo } from "react";

import type { Pokemon } from "@/Domain/pokemon/Model/Pokemon";
import { PokemonItem } from "./PokemonItem";

interface Props {
  pokemons: Pokemon[];
  selectedPokemonId: number;
  hasNext: boolean;
  onSelectPokemon: (pokemonId: number) => void;
}

export function PokemonsList({
  pokemons,
  selectedPokemonId,
  onSelectPokemon,
}: Props) {
  return (
    <ul className="grid gap-4 grid-cols-[repeat(auto-fill,_minmax(100px,_1fr))] auto-rows-[minmax(100px,_1fr)]">
      {useMemo(
        () =>
          pokemons.map((pokemon) => (
            <li
              key={pokemon.id}
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
