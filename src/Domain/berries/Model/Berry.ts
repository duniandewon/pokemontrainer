export interface Berry {
  id: number;
  name: string;
  firmness: string;
  image: string;
}

interface Meta {
  hasNext: boolean;
  nextOffset: number;
}

export interface Berries {
  data: Berry[];
  meta: Meta;
}
