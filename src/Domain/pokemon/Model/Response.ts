export interface Response<T> {
  data: T;
  meta?: {
    hasNext: boolean;
    nextOffset: number;
  };
  errors?: {
    message: string;
    code: string;
  }[];
}
