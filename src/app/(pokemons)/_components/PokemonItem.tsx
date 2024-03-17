import Image from "next/image";

import { Pokemon } from "@/Domain/pokemon/Model/Pokemon";

interface Props {
  pokemon: Pokemon;
  onClick: (pokemonId: number) => void;
  isSelected: boolean;
}
export function PokemonItem({ pokemon, isSelected, onClick }: Props) {
  const handleOnClick = () => {
    onClick(pokemon.id);
  };
  return (
    <div
      className={`flex justify-center items-center cursor-pointer border h-full w-full relative ${
        isSelected
          ? "border-slate-300"
          : "border-transparent hover:border-slate-500"
      }`}
    >
      <Image
        src={pokemon.image}
        alt={pokemon.name}
        width={80}
        height={80}
        onClick={handleOnClick}
      />
    </div>
  );
}
