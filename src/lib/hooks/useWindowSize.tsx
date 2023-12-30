import { useEffect, useState } from 'react';
import { isMobile as moduleIsMobile } from 'react-device-detect';

const MAX_MOBILE_SCREEN_WIDTH = 499;

export default function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Check for device type
      // if (window.innerWidth <= MAX_MOBILE_SCREEN_WIDTH) {
      //   setIsMobile(true || moduleIsMobile);
      // } else {
      //   setIsMobile(false);
      // }
      setIsMobile((window.innerWidth <= MAX_MOBILE_SCREEN_WIDTH) || moduleIsMobile);
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    // Add event listener
    window.addEventListener('resize', handleResize);
    // Call handler right away so state gets updated with initial window size
    handleResize();
    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return { windowSize, isMobile };
}
