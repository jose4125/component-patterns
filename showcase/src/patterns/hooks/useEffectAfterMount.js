import { useRef, useEffect } from 'react'

export const useEffectAfterMount = (cb, deps) => {
  const componentJustMounted = useRef(true);

  useEffect(() => {
    if (!componentJustMounted.current) {
      return cb();
    }
    componentJustMounted.current = false;
  }, deps);
}
