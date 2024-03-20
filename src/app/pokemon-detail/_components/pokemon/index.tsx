import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { usePokemonDetailVM } from "../../usePokemonDetailVM";

export function Pokemon() {
  const {
    data: myPokemon,
    isFetching,
    readyToEvolve,
    onEvolvePokemon,
    onDeletepokemon,
  } = usePokemonDetailVM();

  if (isFetching) return <h2>Loading...</h2>;

  if (!myPokemon) return <h2>Choose a pokemon first</h2>;

  const deleteButton = () => {
    return (
      <div className="absolute top-4 right-0">
        <button
          onClick={onDeletepokemon}
          className="bg-red-500 w-[30px] h-[30px] rounded-full text-xl font-extrabold flex items-center justify-center"
        >
          x
        </button>
      </div>
    );
  };

  return (
    <Card className="border-transparent max-w-72 mx-auto">
      <CardHeader className="gap-4 relative">
        <CardTitle className="capitalize text-center">
          {myPokemon.name}
        </CardTitle>
        <div>
          {myPokemon.image ? (
            <Image
              src={myPokemon.image}
              alt={myPokemon.name}
              className="mx-auto"
              width={150}
              height={150}
            />
          ) : (
            <h2 className="text-sm text-center">
              {myPokemon.name} image palace holder
            </h2>
          )}
        </div>
        {readyToEvolve ? (
          <Button className="w-full" onClick={onEvolvePokemon}>
            Evolve now
          </Button>
        ) : null}
        {deleteButton()}
      </CardHeader>
      <CardContent>
        <ul className="grid gap-2 capitalize">
          {Object.entries(myPokemon.stats).map(([key, value]) => (
            <li key={key} className="grid grid-cols-[1fr_2.5rem] gap-2">
              <p>{key}</p>
              <p className="justify-self-start">: {value}</p>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
