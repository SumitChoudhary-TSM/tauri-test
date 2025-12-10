import { useRef, useEffect } from 'react';

export function useDebounce<Args extends unknown[]>(callback: (...args: Args) => void, delay: number) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const debouncedFunction = (...args: Args) => {
    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      callback(...args);
    }, delay);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [delay]);

  return debouncedFunction;
}
