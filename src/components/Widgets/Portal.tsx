import { useRef, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface IPortal {
  children: React.ReactNode;
  selector: string;
}

export default function Portal({ children, selector = '#modal' }: IPortal) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ref = useRef<any>();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    ref.current = document.querySelector(selector);
    setMounted(true);
  }, [selector]);

  return mounted ? createPortal(children, ref.current) : null;
}
