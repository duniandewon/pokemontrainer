import { Pokemon } from "../Model/Pokemon";
import { PokemonDetail } from "../Model/PokemonDetail";
import { Response } from "../Model/Response";

export interface PokemonRemoteRepository {
  getPokemons(
    limit: number,
    offset: number,
    search?: string
  ): Promise<Response<Pokemon[]>>;

  getPokemonDetail(id: number): Promise<Response<PokemonDetail>>;
}
