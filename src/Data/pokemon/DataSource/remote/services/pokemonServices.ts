import { Data as PokemonDetailData } from "../Entity/PokemonDetailsEntity";
import { Data as PokemonsData } from "../Entity/PokemonEntity";
import { PokemonResponse } from "../Entity/PokemonResponse";

export interface PokemonServices {
  getPokemons(
    limit: number,
    offset: number,
    search?: string
  ): Promise<PokemonResponse<PokemonsData>>;

  getPokemonDetail(id: number): Promise<PokemonResponse<PokemonDetailData>>;
}
