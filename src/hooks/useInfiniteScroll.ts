import { useEffect, useRef } from "react";

export function useInfiniteScroll<T>(cb: () => void) {
  const lastItem = useRef<T | null>(null);

  useEffect(() => {
    const intersectionObserverCb = (enries: IntersectionObserverEntry[]) => {
      if (enries[0].isIntersecting) cb();
    };

    const observer = new IntersectionObserver(intersectionObserverCb);

    if (lastItem.current) {
      observer.observe(lastItem.current);
    }

    return () => observer.disconnect();
  }, [cb]);

  return {
    lastItem,
  };
}
