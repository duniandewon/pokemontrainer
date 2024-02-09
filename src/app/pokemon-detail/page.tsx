"use client";

import { Berries } from "./_components/berries";
import { Pokemon } from "./_components/pokemon";

export default function PokemonDetail() {
  return (
    <div className="h-full w-full grid grid-rows-[1fr_auto] gap-5 p-5">
      <footer>
        <Berries />
      </footer>
      <main>
        <Pokemon />
      </main>
    </div>
  );
}
