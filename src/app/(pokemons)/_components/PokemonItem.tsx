import Image from "next/image";

import { Pokemon } from "@/Domain/pokemon/Model/Pokemon";
import { ChangeEvent } from "react";

interface Props {
  pokemon: Pokemon;
  onChange: (id: number) => void;
  isSelected: boolean;
}

export function PokemonItem({ pokemon, isSelected, onChange }: Props) {
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(Number(e.target.value));
  };

  return (
    <div>
      <input
        type="radio"
        name="pokemon"
        className="peer hidden"
        id={pokemon.id.toString()}
        value={pokemon.id}
        checked={isSelected}
        onChange={handleOnChange}
      />
      <label
        htmlFor={pokemon.id.toString()}
        className="flex items-center h-full w-full justify-center cursor-pointer border p-2 peer-checked:border-slate-300 border-transparent hover:border-slate-500"
      >
        {pokemon.image ? (
          <Image
            src={pokemon.image}
            alt={pokemon.name}
            width={86}
            height={86}
          />
        ) : (
          <h2 className="text-sm text-center">
            {pokemon.name} image place holder
          </h2>
        )}
      </label>
    </div>
  );
}
