import { PokemonDetail } from "../Model/PokemonDetail";
import { Response } from "../Model/Response";

export interface PokemonLocalRepository {
  choosePokemon(pokemon: PokemonDetail): Promise<Response<null>>;

  evolvePokemon(pokemon: PokemonDetail): Promise<Response<PokemonDetail>>;
}
