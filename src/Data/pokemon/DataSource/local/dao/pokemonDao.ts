import { PokemonDb } from "../model/pokemonDb";

export interface pokemonDao {
  getMyPokemon(): PokemonDb;

  choosePokemon(pokemon: PokemonDb): void;

  feedPokemon(firmness: string): PokemonDb;

  evolvePokemon(prevPokemonId: number, newPokemon: PokemonDb): PokemonDb;

  deletePokemon(id: number): void;
}
