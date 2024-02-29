import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { usePokemonDetailVM } from "../../usePokemonDetailVM";

export function Pokemon() {
  const { data: myPokemon, isFetching, readyToEvolve } = usePokemonDetailVM();

  if (isFetching) return <h2>Loading...</h2>;

  if (!myPokemon) return <h2>Choose a pokemon first</h2>;

  return (
    <Card className="border-transparent max-w-72 mx-auto">
      <CardHeader className="gap-4">
        <CardTitle className="capitalize text-center">
          {myPokemon.name}
        </CardTitle>
        <div>
          <Image
            src={myPokemon.image}
            alt={myPokemon.name}
            className="mx-auto"
            width={150}
            height={150}
          />
        </div>
        {readyToEvolve ? <Button className="w-full">Evolve now</Button> : null}
      </CardHeader>
      <CardContent>
        <ul className="grid gap-2 capitalize">
          {Object.entries(myPokemon.stats).map(([key, value]) => (
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
}
