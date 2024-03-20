import { useCallback, useEffect, useMemo, useRef } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";

import {
  GetBerriesUseCase,
  getBerriesUseCase,
} from "@/Domain/berries/UseCase/getBerries.usecase";

export function useGetBerries(
  getBerriesUC: GetBerriesUseCase = getBerriesUseCase()
) {
  const lastBerry = useRef<HTMLLIElement>(null);
  const limit = useRef(20);

  const getBerries = async (limit: number, offset: number) => {
    return await getBerriesUC.invoke(limit, offset);
  };

  const { data, isFetching, fetchNextPage } = useInfiniteQuery({
    queryKey: ["berries"],
    initialPageParam: 0,
    queryFn: ({ pageParam }) => getBerries(limit.current, pageParam),
    getNextPageParam: (lastPage) => lastPage.meta?.nextOffset,
  });

  const berries = useMemo(
    () => (data?.pages ? data.pages.map((page) => page.data).flat() : []),
    [data?.pages]
  );

  const hasNext = useMemo(() => data?.pages[0].meta?.hasNext, [data?.pages]);

  const handleIntersectinObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting && !isFetching) {
        fetchNextPage();
      }
    },
    [isFetching, fetchNextPage]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersectinObserver);

    if (lastBerry.current) observer.observe(lastBerry.current);

    return () => observer.disconnect();
  }, [handleIntersectinObserver]);

  return {
    berries,
    hasNext,
    lastBerry,
  };
}
