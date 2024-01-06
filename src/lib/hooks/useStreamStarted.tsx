import { useEffect } from 'react'
import useBuildPCContext from './contextHooks/useBuildPCContext';

function useStreamStarted(cb: () => void = () => { }) {
  const {
    currentBuild,
    pixelStreamRef,
    streamPlaying,
    handleSetStreamPlaying
  } = useBuildPCContext()

  useEffect(() => {
    if (pixelStreamRef.current && !streamPlaying) {
      console.log('Unreal Event: Add webRtcConnected and playStream listeners for stream');
      pixelStreamRef.current.addEventListener('webRtcConnected', () => {
        console.log('Unreal Event: webRtcConnected listeners fired for stream');
        handleSetStreamPlaying(true);
      })

      pixelStreamRef.current.addEventListener('playStream', () => {
        console.log('Unreal Event: playStream listeners fired for stream');
        handleSetStreamPlaying(true);
      })
    }
  }, [pixelStreamRef.current, streamPlaying])

  useEffect(() => {
    if (streamPlaying) {
      console.log('Unreal Event: Stream fired for stream - ', streamPlaying);
      setTimeout(() => {
        cb();
        // handleSetStreamPlaying(false);
      }, 1000);
    }
  }, [currentBuild, streamPlaying])

  return null;
}

export default useStreamStarted