import { useCallback, useRef } from 'react';

export function useDebounce<T extends (...args: Parameters<T>) => ReturnType<T>>(callback: T, delay = 500) {
  const timeoutRef = useRef<NodeJS.Timeout>(undefined);

  return useCallback(
    (...args: Parameters<T>) => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      timeoutRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay],
  );
}
