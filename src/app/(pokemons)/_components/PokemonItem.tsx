import Image from "next/image";

import { Pokemon } from "@/Domain/pokemon/Model/Pokemon";

interface Props {
  pokemon: Pokemon;
  isSelected: boolean;
}
export function PokemonItem({ pokemon, isSelected }: Props) {
  return (
    <div
      className={`cursor-pointer border p-2 ${
        isSelected ? "border-slate-300" : "border-transparent hover:border-slate-300"
      }`}
    >
      <Image src={pokemon.image} alt={pokemon.name} width={150} height={150} />
    </div>
  );
}
