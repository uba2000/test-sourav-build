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
      console.log('Unreal Event: Unreal Pixel Stream \'webRtcConnected\' event listeners added');
      pixelStreamRef.current.addEventListener('webRtcConnected', () => {
        console.log('Unreal Event: Unreal Pixel Stream \'webRtcConnected\' event listeners fired');
        handleSetStreamPlaying(true);
      })

      // pixelStreamRef.current.addEventListener('playStream', () => {
      //   console.log('Unreal Event: playStream listeners fired for stream');
      //   handleSetStreamPlaying(true);
      // })
    }
  }, [pixelStreamRef.current, streamPlaying])

  useEffect(() => {
    if (streamPlaying) {
      cb();
    }
  }, [currentBuild, streamPlaying])

  return null;
}

export default useStreamStarted