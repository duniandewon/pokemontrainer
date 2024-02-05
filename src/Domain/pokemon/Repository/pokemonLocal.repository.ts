import { PokemonDetail } from "../Model/PokemonDetail";

export interface PokemonLocalRepository {
  choosePokemon(pokemon: PokemonDetail): void;

  evolvePokemon(
    prevPokemonId: number,
    evolveToPokemon: PokemonDetail
  ): PokemonDetail;
}
