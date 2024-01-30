import Image from "next/image";

import { useBerriesVM } from "./useBerriesVM";

import { Button } from "@/components/ui/button";

import style from "./berries.module.css";

export function Berries() {
  const { berries, hasNext, lastBerry } = useBerriesVM();

  return (
    <div className="grid gap-4">
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
                className={style.berry__input}
              />
              <label htmlFor={berry.id.toString()} className={style.berry__label}>
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
      <Button className="w-full">Feed Pokemon</Button>
    </div>
  );
}
