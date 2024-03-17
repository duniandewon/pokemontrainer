import Image from "next/image";

import { Pokemon } from "@/Domain/pokemon/Model/Pokemon";

interface Props {
  pokemon: Pokemon;
  isSelected: boolean;
}
export function PokemonItem({ pokemon, isSelected }: Props) {
  return (
    <div
      className={`flex justify-center items-center cursor-pointer border h-full w-full relative ${
        isSelected ? "border-slate-300" : "border-transparent hover:border-slate-500"
      }`}
    >
      <Image src={pokemon.image} alt={pokemon.name} width={80} height={80} layout="reponsive" />
    </div>
  );
}
