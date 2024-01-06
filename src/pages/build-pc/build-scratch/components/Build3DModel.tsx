/* eslint-disable no-empty */
import {
  Config,
  AllSettings,
  PixelStreaming
} from '@epicgames-ps/lib-pixelstreamingfrontend-ue5.4';
import { useEffect, useRef, useState } from 'react';
import useBuildPCContext from '../../../../lib/hooks/contextHooks/useBuildPCContext';
import { PIXEL_STREAM_PUBLIC_IP } from '../../../../lib/utils/util-constants';

export interface PixelStreamingWrapperProps {
  initialSettings?: Partial<AllSettings>;
  placeholder?: string;
}

const initialModelSettings = {
  AutoPlayVideo: true,
  AutoConnect: true,
  ss: PIXEL_STREAM_PUBLIC_IP,
  StartVideoMuted: true,
  HoveringMouse: true,
  WaitForStreamer: true
}

function Build3DModel({
  initialSettings = {}
}: PixelStreamingWrapperProps) {

  // A reference to parent div element that the Pixel Streaming library attaches into:
  const videoParent = useRef<HTMLDivElement>(null);

  const { setPixelStream, pixelStreamRef } = useBuildPCContext()

  // Pixel streaming library instance is stored into this state variable after initialization:
  const [pixelStreaming, setPixelStreaming] = useState<PixelStreaming>(pixelStreamRef.current);

  // A boolean state variable that determines if the Click to play overlay is shown:
  const [clickToPlayVisible, setClickToPlayVisible] = useState(false);

  // Run on component mount:
  useEffect(() => {
    if (videoParent.current) {
      console.log('in', pixelStreamRef.current);
      // Attach Pixel Streaming library to videoParent element:

      const config = new Config({
        initialSettings: {
          ...initialModelSettings,
          ...initialSettings,
        },
        useUrlParams: true,
      });
      const streaming = new PixelStreaming(config, {
        videoElementParent: videoParent.current
      });

      // register a playStreamRejected handler to show Click to play overlay if needed:
      streaming.addEventListener('playStreamRejected', () => {
        setClickToPlayVisible(true);
      });

      // Save the library instance into component state so that it can be accessed later:
      setPixelStreaming(streaming);
      setPixelStream(streaming)

      // Clean up on component unmount:
      return () => {
        try {
          // resetPixelStream()
        } catch { }
      };
    }
  }, []);

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        position: 'relative'
      }}
    >
      <div
        style={{
          width: '100%',
          height: '100%'
        }}
        ref={videoParent}
      />
      {clickToPlayVisible && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
          onClick={() => {
            pixelStreaming?.play();
            setClickToPlayVisible(false);
          }}
        >
          <div>Click to view</div>
        </div>
      )}
    </div>
    // <ImageFigure icon={currentModel} isContainerSize />
  )
}

export default Build3DModel