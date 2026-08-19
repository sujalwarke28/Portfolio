import { useEffect, useState } from 'react';

function getInitial() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(pointer: fine)').matches;
}

/**
 * True only for real mouse/trackpad input. Touch and coarse pointers
 * (and therefore every custom-cursor / hover-only effect) stay off on those
 * devices — native scrolling and tap behavior is left completely alone.
 */
export function useFinePointer() {
  const [fine, setFine] = useState(getInitial);

  useEffect(() => {
    const query = window.matchMedia('(pointer: fine)');
    const handler = (e) => setFine(e.matches);
    query.addEventListener('change', handler);
    return () => query.removeEventListener('change', handler);
  }, []);

  return fine;
}
