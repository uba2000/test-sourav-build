import { PixelStreamingWrapper } from '../components/Widgets/PixelStreamingWrapper'
import { PIXEL_STREAM_PUBLIC_IP } from '../lib/utils/util-constants'

function Page3D() {
  return (
    <div
      style={{
        height: '100%',
        width: '100%'
      }}
    >
      <PixelStreamingWrapper
        initialSettings={{
          AutoPlayVideo: true,
          AutoConnect: true,
          ss: PIXEL_STREAM_PUBLIC_IP,
          StartVideoMuted: true,
          HoveringMouse: true,
          WaitForStreamer: true
        }}
      />
    </div>
  )
}

export default Page3D