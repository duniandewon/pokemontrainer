import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { usePokemonDetailVM } from "./usePokemonDetailVM";

interface Props {
  id: number;
}

export function PokemonDetail({ id }: Props) {
  const { data: pokemon, readyToEvolve } = usePokemonDetailVM(id);

  if (!pokemon) return;

  return (
    <Card className="border-transparent max-w-72 mx-auto">
      <CardHeader className="gap-4">
        <CardTitle className="capitalize text-center">{pokemon.name}</CardTitle>
        <div>
          <Image
            src={pokemon.image}
            alt={pokemon.name}
            className="mx-auto"
            width={150}
            height={150}
          />
        </div>
        {readyToEvolve ? <Button className="w-full">Evolve now</Button> : null}
      </CardHeader>
      <CardContent>
        <ul className="grid gap-2 capitalize">
          {Object.entries(pokemon.stats).map(([key, value]) => (
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
