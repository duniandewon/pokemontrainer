interface Data {
  id: number;
  name: string;
  firmness: string;
  image: string;
}

interface Meta {
  hasNext: boolean;
  nextOffset: number;
}

export interface Berry {
  data: Data[];
  meta: Meta;
}
