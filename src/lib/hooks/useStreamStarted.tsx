import { useEffect, useState } from 'react'
import useSingleEffectCall from './useSingleEffectCall';
import useBuildPCContext from './contextHooks/useBuildPCContext';

function useStreamStarted(cb: () => void = () => { }) {
  const {
    currentBuild,
    pixelStreamRef
  } = useBuildPCContext()

  const [canPlayStream, setCanPlayStream] = useState(false)

  useSingleEffectCall(() => {
    console.log('Unreal Event: Add webRtcConnected and playStream listeners for stream');

    if (pixelStreamRef.current) {
      pixelStreamRef.current.addEventListener('webRtcConnected', () => {
        console.log('Unreal Event: webRtcConnected listeners fired for stream');
        setCanPlayStream(true);
      })

      pixelStreamRef.current.addEventListener('playStream', () => {
        console.log('Unreal Event: playStream listeners fired for stream');
        setCanPlayStream(true);
      })
    }
  })

  useEffect(() => {
    if (currentBuild.length > 0 && canPlayStream) {
      console.log('Unreal Event: Stream fired for stream - ', canPlayStream);
      setTimeout(() => {
        cb();
        // setCanPlayStream(false);
      }, 1000);
    }
  }, [currentBuild, canPlayStream])

  return null;
}

export default useStreamStarted