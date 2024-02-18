import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { useInfiniteQuery } from "@tanstack/react-query";

import {
  GetBerriesUseCase,
  getBerriesUseCase,
} from "@/Domain/berries/UseCase/getBerries.usecase";

import {
  GetMyPokemonUseCase,
  getMyPokemonUseCase,
} from "@/Domain/pokemon/UseCase/getMyPokemon.usecase";

import {
  FeedPokemonUseCase,
  feedPokemonUseCase,
} from "@/Domain/pokemon/UseCase/feedPokemon.usecase";

import { PokemonDetail } from "@/Domain/pokemon/Model/PokemonDetail";

import { useFeedPokemon } from "./useFeedPokemon";

export function useBerriesVM(
  getBerriesUC: GetBerriesUseCase = getBerriesUseCase(),
  getMyPokemonUC: GetMyPokemonUseCase = getMyPokemonUseCase(),
  feedPokemonUC: FeedPokemonUseCase = feedPokemonUseCase()
) {
  const [mealFirmnes, setMealFirmnes] = useState("");

  const lastBerry = useRef<HTMLLIElement>(null);
  const limit = useRef(20);

  const getBerries = useCallback(async (limit: number, offset: number) => {
    return await getBerriesUC.invoke(limit, offset);
  }, []);

  const getMyPokemon = useCallback(() => {
    const myPokemon = getMyPokemonUC.invoke();

    return myPokemon;
  }, []);

  const { data, isFetching, fetchNextPage } = useInfiniteQuery({
    queryKey: ["berries"],
    initialPageParam: 0,
    queryFn: ({ pageParam }) => getBerries(limit.current, pageParam),
    getNextPageParam: (lastPage) => lastPage.meta.nextOffset,
  });

  const feedPokemon = useCallback(async (firmness: string) => {
    return new Promise<PokemonDetail>((resolve) => {
      const pokemon = feedPokemonUC.invoke(firmness);
      resolve(pokemon);
    });
  }, []);

  const { mutate } = useFeedPokemon(mealFirmnes, getMyPokemon, feedPokemon);

  const onFeedPokemon = useCallback(() => {
    mutate(getMyPokemon());
  }, [mutate, getMyPokemon]);

  const handleIntersectinObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting && !isFetching) {
        fetchNextPage();
      }
    },
    [isFetching, fetchNextPage]
  );

  const berries = useMemo(
    () => (data?.pages ? data.pages.map((page) => page.data).flat() : []),
    [data?.pages]
  );

  const hasNext = useMemo(() => data?.pages[0].meta.hasNext, [data?.pages]);

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersectinObserver);

    if (lastBerry.current) observer.observe(lastBerry.current);

    return () => observer.disconnect();
  }, [handleIntersectinObserver]);

  return { berries, onFeedPokemon, setMealFirmnes, lastBerry, hasNext };
}
