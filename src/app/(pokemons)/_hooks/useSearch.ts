import { useState } from "react";

import useDebounce from "./useDebounce";

export function useSearch() {
  const [search, setSearch] = useState("");

  const searchDebounced = useDebounce(search, 1000);

  const onSearchPokemons = (search: string) => {
    setSearch(search);
  };

  return {
    searchDebounced,
    onSearchPokemons,
  };
}
