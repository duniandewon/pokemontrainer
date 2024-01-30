import { useCallback, useEffect, useMemo, useRef } from "react";

import { useInfiniteQuery } from "@tanstack/react-query";

import { berriesApiImpl } from "@/Data/berries/DataSource/Api/BerriesApiImpl";
import { berriesRepositoryImpl } from "@/Data/berries/Repository/BerriesRepositoryImpl";

import { getBerriesUseCase } from "@/Domain/berries/UseCase/getBerries.usecase";

export function useBerriesVM() {
  const lastBerry = useRef<HTMLLIElement>(null);
  const limit = useRef(20);

  const berriesApi = useMemo(() => berriesApiImpl(), []);

  const berriesRepoImpl = useMemo(
    () => berriesRepositoryImpl(berriesApi),
    [berriesApi]
  );

  const getBerriesUC = useMemo(
    () => getBerriesUseCase(berriesRepoImpl),
    [berriesRepoImpl]
  );

  const getBerries = useCallback(
    async (limit: number, offset: number) => {
      return await getBerriesUC.invoke(limit, offset);
    },
    [getBerriesUC]
  );

  const { data, isFetching, fetchNextPage } = useInfiniteQuery({
    queryKey: ["berries"],
    initialPageParam: 0,
    queryFn: ({ pageParam }) => getBerries(limit.current, pageParam),
    getNextPageParam: (lastPage) => lastPage.meta.nextOffset,
  });

  const handleIntersectinObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting && !isFetching) {
        console.log("hello");
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

  return { lastBerry, berries, hasNext };
}
