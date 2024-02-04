import {
  Data,
  PokemonV2Pokemonspecy,
  PokemonV2PokemonspecyPokemonV2Pokemon,
  PokemonV2Pokemonstat,
} from "../Entity/PokemonDetailsEntity";

import { Response } from "@/Domain/pokemon/Model/Response";
import {
  PokemonDetail,
  PokemonStats,
} from "@/Domain/pokemon/Model/PokemonDetail";
import { PokemonResponse } from "../Entity/PokemonResponse";

function pokemonV2PokemonstatToPokemonStats(
  pokemonV2Pokemonstat: PokemonV2Pokemonstat[]
): PokemonStats {
  const pokemonStats: PokemonStats = {
    hp: 0,
    attack: 0,
    defense: 0,
    speed: 0,
    weight: 0,
  };

  pokemonV2Pokemonstat.forEach((stat) => {
    const baseStatValue = stat.base_stat;
    const statName = stat.pokemon_v2_stat.name;

    switch (statName) {
      case "attack":
        pokemonStats.attack = baseStatValue;
        break;
      case "defense":
        pokemonStats.defense = baseStatValue;
        break;
      case "hp":
        pokemonStats.hp = baseStatValue;
        break;
      case "speed":
        pokemonStats.speed = baseStatValue;
        break;
    }
  });

  return pokemonStats;
}

function getNextEvolution(evolutions: PokemonV2Pokemonspecy[]) {
  let nextEvolution: PokemonV2PokemonspecyPokemonV2Pokemon | undefined;

  let smallestWeight = Number.MAX_VALUE;

  for (const evolution of evolutions) {
    const pokemons = evolution.pokemon_v2_pokemons;

    for (const pokemon of pokemons) {
      if (pokemon.weight < smallestWeight) {
        smallestWeight = pokemon.weight;
        nextEvolution = pokemon;
      }
    }
  }

  return nextEvolution;
}

export function mapFromReomtePokemonDetail(
  pokemonDetailResponse: PokemonResponse<Data>
): Response<PokemonDetail> {
  const pokemon = pokemonDetailResponse.data.pokemon_v2_pokemon[0];
  const nextEvolution = getNextEvolution(
    pokemonDetailResponse.data.pokemon_v2_pokemonspecies
  );

  return {
    data: {
      id: pokemon.id,
      name: pokemon.name,
      image:
        pokemon.pokemon_v2_pokemonsprites[0].sprites.other?.["official-artwork"]
          .front_default || "",
      maxWeight: nextEvolution?.weight || 0,
      nextEvolution: nextEvolution?.id || -1,
      prevMeal: "",
      stats: {
        ...pokemonV2PokemonstatToPokemonStats(pokemon.pokemon_v2_pokemonstats),
        weight: pokemon.weight,
      },
    },
  };
}
