export interface Response<T> {
    data: T;
    meta?: Meta;
    errors?: Error[];
  }
  
  interface Error {
    message: string;
    extensions: Extensions;
  }
  
  interface Extensions {
    path: string;
    code: string;
  }
  
  interface Meta {
    hasNext: boolean;
    nextOffset: number;
  }
  