import { PokemonDetailEntity } from "./Api/Entity/PokemonDetailsEntity";
import { PokemonEntity } from "./Api/Entity/PokemonEntity";

export interface PokemonDataSource {
  getPokemons(
    limit: number,
    offset: number,
    search?: string
  ): Promise<PokemonEntity>;
  getPokemonDetail(id: number): Promise<PokemonDetailEntity>;
}
