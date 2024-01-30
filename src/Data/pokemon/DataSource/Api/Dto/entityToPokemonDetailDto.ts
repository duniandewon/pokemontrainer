import { PokemonDetail, PokemonStats } from "@/Domain/pokemon/Model/PokemonDetail";
import {
  PokemonDetailEntity,
  PokemonV2Pokemonstat,
} from "../Entity/PokemonDetailsEntity";

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

export function entityToPokemonDetailDto(
  pokemonEntity: PokemonDetailEntity
): PokemonDetail {
  const pokemon = pokemonEntity.data.pokemon_v2_pokemon[0];
  const species =
    pokemonEntity.data.pokemon_v2_pokemonspecies[0].pokemon_v2_pokemons[0];

  return {
    id: pokemon.id,
    name: pokemon.name,
    image:
      pokemon.pokemon_v2_pokemonsprites[0].sprites.other?.["official-artwork"]
        .front_default || "",
    maxWeight: species.weight,
    nextEvolution: species.id,
    stats: {
      ...pokemonV2PokemonstatToPokemonStats(pokemon.pokemon_v2_pokemonstats),
      weight: pokemon.weight,
    },
  };
}
