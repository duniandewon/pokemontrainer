"use client";

import { usePokemonVM } from "./usPokemonVM";

import { Berries } from "./_components/Berries";
import { PokemonDetail } from "./_components/PokemonDetail";

function Pokemon({ params }: { params: { id: number } }) {
  return (
    <div className="h-full w-full grid grid-rows-[1fr_auto] gap-5 p-5">
      <main>
        <PokemonDetail id={params.id} />
      </main>
      <footer>
        <Berries />
      </footer>
    </div>
  );
}

export default Pokemon;
