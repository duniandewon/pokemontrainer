"use client";

import Image from "next/image";
import { useCallback, useMemo, useState } from "react";

import { usePokemonsDetailVM } from "./usPokemonDetailVM";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function PokemonDetail({ params }: { params: { id: number } }) {
  const [food, setFood] = useState("");

  const { data, status } = usePokemonsDetailVM(params.id);

  const readyToEvolve = useMemo(() => {
    if (!data) return false;

    return data.maxWeight === data.stats.weight;
  }, [data]);

  const renderPokemon = useCallback(() => {
    if (!data) return;

    return (
      <Card className="border-transparent max-w-72 mx-auto">
        <CardHeader className="gap-4">
          <CardTitle className="capitalize text-center">{data?.name}</CardTitle>
          <div>
            <Image
              src={data.image}
              alt={data.name}
              className="mx-auto"
              width={150}
              height={150}
            />
          </div>
          {readyToEvolve ? (
            <Button className="w-full">Evolve now</Button>
          ) : null}
        </CardHeader>
        <CardContent>
          <ul className="grid gap-2 capitalize">
            {Object.entries(data.stats).map(([key, value]) => (
              <li key={key} className="grid grid-cols-[1fr_auto_auto] gap-2">
                <p>{key}</p>
                <p>:</p>
                <p className="justify-self-end">{value}</p>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    );
  }, [data, readyToEvolve]);

  if (status === "pending") return <h2>Loading...</h2>;

  if (status === "error") return <h2>Something went wrong</h2>;

  return (
    <div className="h-full grid grid-rows-[1fr_auto] gap-5 p-5">
      <main>{renderPokemon()}</main>
      <footer className="grid gap-5">
        <div className="w-full h-16 bg-slate-500" />
        <Button className="w-full" disabled={readyToEvolve}>
          Feed Pokemon
        </Button>
      </footer>
    </div>
  );
}

export default PokemonDetail;
