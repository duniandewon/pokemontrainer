import { PokemonDetail } from "../Model/PokemonDetail";

export interface PokemonLocalRepository {
  getMyPokemon(): PokemonDetail;

  choosePokemon(pokemon: PokemonDetail): void;

  feedPokemon(firmness: string): PokemonDetail;

  evolvePokemon(
    prevPokemonId: number,
    evolveToPokemon: PokemonDetail
  ): PokemonDetail;
}
