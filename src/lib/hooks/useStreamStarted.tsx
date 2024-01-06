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
    if (pixelStreamRef.current) {
      pixelStreamRef.current.addEventListener('webRtcConnected', () => {
        console.log('webRtcConnected');
        setCanPlayStream(true);
      })

      pixelStreamRef.current.addEventListener('playStream', () => {
        console.log('handleStreamPlaying(true)');
        console.log('play stream');
        setCanPlayStream(true);
      })
    }
  })

  useEffect(() => {
    if (currentBuild.length > 0 && canPlayStream) {
      console.log('Unreal Event: - canPlayStream: ', canPlayStream);

      setTimeout(() => {
        cb();
        // setCanPlayStream(false);
      }, 1000);
    }
  }, [currentBuild, canPlayStream])

  return null;
}

export default useStreamStarted