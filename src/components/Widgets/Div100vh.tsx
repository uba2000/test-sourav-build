/* eslint-disable @typescript-eslint/no-explicit-any */
import { forwardRef, useState, useEffect } from 'react';

let warned = false;

const Div100vh = forwardRef(({ style, ...other }: any, ref) => {
  const height = use100vh();

  if (!import.meta.env.PROD) {
    if (!warned && style?.height) {
      warned = true;
      console.warn(
        '<Div100vh /> overrides the height property of the style prop',
      );
    }
  }

  const styleWithRealHeight = {
    ...style,
    height: height ? `${height}px` : '100vh',
  };
  return <div ref={ref} style={styleWithRealHeight} {...other} />;
});

Div100vh.displayName = 'Div100vh';

export default Div100vh;

export function use100vh() {
  const [height, setHeight] = useState(measureHeight());

  const wasRenderedOnClientAtLeastOnce = useWasRenderedOnClientAtLeastOnce();

  useEffect(() => {
    if (!wasRenderedOnClientAtLeastOnce) return;

    function setMeasuredHeight() {
      const measuredHeight = measureHeight();
      setHeight(measuredHeight);
    }

    window.addEventListener('resize', setMeasuredHeight);
    return () => window.removeEventListener('resize', setMeasuredHeight);
  }, [wasRenderedOnClientAtLeastOnce]);
  return wasRenderedOnClientAtLeastOnce ? height : null;
}

export function measureHeight() {
  if (!isClient()) return null;
  return window.innerHeight;
}

// Once we ended up on the client, the first render must look the same as on
// the server so hydration happens without problems. _Then_ we immediately
// schedule a subsequent update and return the height measured on the client.
// It's not needed for CSR-only apps, but is critical for SSR.
function useWasRenderedOnClientAtLeastOnce() {
  const [wasRenderedOnClientAtLeastOnce, setWasRenderedOnClientAtLeastOnce] = useState(false);

  useEffect(() => {
    if (isClient()) {
      setWasRenderedOnClientAtLeastOnce(true);
    }
  }, []);
  return wasRenderedOnClientAtLeastOnce;
}

function isClient() {
  return typeof window !== 'undefined' && typeof document !== 'undefined';
}
