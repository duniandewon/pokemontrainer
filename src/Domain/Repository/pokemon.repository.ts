import { Pokemons } from "../Model/Pokemon";
import { PokemonDetail } from "../Model/PokemonDetail";

export interface PokemonRepository {
  getPokemons(
    limit: number,
    offset: number,
    search?: string
  ): Promise<Pokemons>;

  getPokemonDetail(id: number): Promise<PokemonDetail>;
}
