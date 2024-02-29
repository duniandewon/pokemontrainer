import { FormEvent, useCallback } from "react";

import { Button } from "@/components/ui/button";

import { usePokemonDetailVM } from "../../usePokemonDetailVM";

import { Berry } from "./Berry";

export function Berries() {
  const {
    berries,
    hasNext,
    lastBerry,
    feedPokemon,
    setMealFirmnes,
    readyToEvolve,
  } = usePokemonDetailVM();

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      feedPokemon();
    },
    [feedPokemon]
  );

  const handleChange = useCallback(
    (value: string) => {
      setMealFirmnes(value);
    },
    [setMealFirmnes]
  );

  return (
    <form className="grid gap-4" onSubmit={handleSubmit}>
      <ul className="flex gap-4 overflow-x-auto">
        {berries.map((berry, i, prevBerries) => (
          <li
            key={berry.id}
            ref={prevBerries.length - 1 === i && hasNext ? lastBerry : null}
          >
            <Berry
              berry={berry}
              isEnabled={readyToEvolve}
              onChange={handleChange}
            />
          </li>
        ))}
      </ul>
      <Button type="submit" className="w-full" disabled={readyToEvolve}>
        Feed Pokemon
      </Button>
    </form>
  );
}
