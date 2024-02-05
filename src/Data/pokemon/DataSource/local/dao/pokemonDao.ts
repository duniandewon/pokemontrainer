import { PokemonDb } from "../model/pokemonDb";

export interface pokemonDao {
  choosePokemon(pokemon: PokemonDb): void;

  evolvePokemon(prevPokemonId: number, newPokemon: PokemonDb): PokemonDb;
}
