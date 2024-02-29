import Image from "next/image";

import { ChangeEvent } from "react";

import style from "./berries.module.css";
import { Berry } from "@/Domain/berries/Model/Berry";

interface Props {
  berry: Berry;
  isEnabled: boolean;
  onChange(value: string): void;
}

export function Berry({ berry, isEnabled, onChange }: Props) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className={style.berry}>
      <input
        type="radio"
        id={berry.id.toString()}
        name="berry"
        value={berry.firmness}
        onChange={handleChange}
        className={style.berry__input}
        disabled={isEnabled}
      />
      <label htmlFor={berry.id.toString()} className={style.berry__label}>
        <Image width={50} height={50} src={berry.image} alt={berry.name} />
      </label>
    </div>
  );
}
