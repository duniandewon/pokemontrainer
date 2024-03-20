import Image from "next/image";

import { Pokemon } from "@/Domain/pokemon/Model/Pokemon";

interface Props {
  pokemon: Pokemon;
  isSelected: boolean;
}
export function PokemonItem({ pokemon, isSelected }: Props) {
  return (
    <div
      className={`flex items-center h-full w-full justify-center cursor-pointer border p-2 ${
        isSelected
          ? "border-slate-300"
          : "border-transparent hover:border-slate-300"
      }`}
    >
      {pokemon.image ? (
        <Image
          src={pokemon.image}
          alt={pokemon.name}
          width={150}
          height={150}
        />
      ) : (
        <h2 className="text-sm text-center">
          {pokemon.name} image place holder
        </h2>
      )}
    </div>
  );
}
