export interface Pokemon {
  id: number;
  name: string;
  image: string;
}

export interface Pokemons {
  data: Pokemon[];
  meta: {
    hasNext: boolean;
    nextOffset: number;
  };
  errors?: {
    message: string;
    code: string;
  }[];
}
