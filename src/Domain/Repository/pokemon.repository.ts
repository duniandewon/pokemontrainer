import { Pokemons } from "../Model/Pokemon";

export interface PokemonRepository {
  getPokemons(
    limit: number,
    offset: number,
    search?: string
  ): Promise<Pokemons>;
}
