import Image from "next/image";

import { useBerriesVM } from "./useBerriesVM";

import { ChangeEvent, FormEvent, useCallback, useState } from "react";

import { Button } from "@/components/ui/button";

import style from "./berries.module.css";

export function Berries() {
  const { berries, hasNext, lastBerry, onFeedPokemon, setMealFirmnes } =
    useBerriesVM();

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      onFeedPokemon();
    },
    [onFeedPokemon]
  );

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setMealFirmnes(e.target.value);
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
            <div className={style.berry}>
              <input
                type="radio"
                id={berry.id.toString()}
                name="berry"
                value={berry.firmness}
                onChange={handleChange}
                className={style.berry__input}
              />
              <label
                htmlFor={berry.id.toString()}
                className={style.berry__label}
              >
                <Image
                  width={50}
                  height={50}
                  src={berry.image}
                  alt={berry.name}
                />
              </label>
            </div>
          </li>
        ))}
      </ul>
      <Button type="submit" className="w-full">
        Feed Pokemon
      </Button>
    </form>
  );
}
