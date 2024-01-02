import { PixelStreamingWrapper } from '../components/Widgets/PixelStreamingWrapper'

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
          ss: 'ws://18.205.109.214:80',
          StartVideoMuted: true,
          HoveringMouse: true,
          WaitForStreamer: true
        }}
      />
    </div>
  )
}

export default Page3D