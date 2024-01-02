/* eslint-disable consistent-return */
import { useEffect, useRef } from 'react';

function useSingleEffectCall(callback: () => void) {
  const effectRun = useRef(false);

  useEffect(() => {
    if (!effectRun.current) {
      callback();

      return () => {
        effectRun.current = true;
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return {};
}

export default useSingleEffectCall;
