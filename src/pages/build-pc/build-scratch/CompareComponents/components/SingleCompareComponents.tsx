import ImageFigure from '../../../../../components/ImageFigure'
import CircleCloseIcon from '../../../../../assets/circle-close-icon.svg'
import PolygonContainer from '../../../../../components/PolygonContainer/PolygonContainer'
import StarRatingComponent from '../../../../../components/StarRatingComponent/StarRatingComponent'
import CompatibilityBadge from '../../../../../components/CompatibilityBadge/CompatibilityBadge'
import Button from '../../../../../components/Button/Button'
import RightArrow from '../../../../../assets/right-arrow-white.svg'

interface ISingleCompareComponents {
  handleToggleSingleDetails: () => void
}

function SingleCompareComponents({handleToggleSingleDetails}: ISingleCompareComponents) {
  return (
    <div className='flex flex-col gap-y-4'>
      <div className="flex justify-end">
        <button type='button' className="cursor-pointer" onClick={() => handleToggleSingleDetails()}>
          <ImageFigure icon={CircleCloseIcon} width={16} />
        </button>
      </div>

      <div className='my-2 w-full'>
        <PolygonContainer>
          <div className="py-3 flex flex-col items-center text-center gap-y-3">
            <h1 className="text-M-h1 max-w-[257px] font-IntelOneDisplayBold">
              Intel® Core™ i9-14900K processor
            </h1>

            <div className="flex justify-center gap-x-6">
              <div className="flex gap-1 items-center">
                <StarRatingComponent />
                <span className="text-xs leading-[10px]">4,258 reviews</span>
              </div>
              <CompatibilityBadge />
            </div>

            <div className="flex gap-x-3 items-center">
              <span className="font-IntelOneBodyTextMedium text-xs">$659.99</span>
              <Button variant='cobalt'>
                <div className="flex items-center gap-x-[6px] py-1 px-2 text-xs">
                  Add to build
                  <ImageFigure icon={RightArrow} width={12} />
                </div>
              </Button>
            </div>

          </div>
        </PolygonContainer>
      </div>

      <div className="flex gap-y-4 max-w-[168px] mx-auto flex-wrap justify-center">
        <div className="grid grid-cols-[80px_80px] gap-2 w-full">
          <div className="bg-[rgba(255,255,255,0.2)] py-3 flex flex-col items-center">
            <span className='text-M-h1 font-IntelOneBodyTextBold'>20</span>
            <span className='text-xs font-IntelOneBodyTextMedium leading-[12px]'>Cores</span>
          </div>
          <div className="flex flex-col gap-y-2">
            <div className="bg-[rgba(255,255,255,0.2)] py-1 flex flex-col items-center">
              <span className='text-xs font-IntelOneBodyTextMedium leading-[14px]'>8</span>
              <span className='text-xs font-IntelOneBodyTextMedium leading-[12px]'>P-cores</span>
            </div>
            <div className="bg-[rgba(255,255,255,0.2)] py-1 flex flex-col items-center">
              <span className='text-xs font-IntelOneBodyTextMedium leading-[14px]'>12</span>
              <span className='text-xs font-IntelOneBodyTextMedium leading-[12px]'>E-cores</span>
            </div>
          </div>
        </div>
        <div className="bg-[rgba(255,255,255,0.2)] py-3 flex flex-col items-center min-w-[80px]">
          <span className='text-M-h1 font-IntelOneBodyTextBold'>125W</span>
          <span className='text-xs font-IntelOneBodyTextMedium leading-[12px]'>TDP</span>
        </div>
      </div>

      <div className="max-w-[199px] min-h-[100px] mx-auto flex items-center">
        <span className='text-xs font-IntelOneBodyTextMedium max-w-[83px]'>Up to 6.0 GHz Max turbo</span>
        {/* Circle chat here */}
      </div>

      <div className="border border-[rgba(255,255,255,0.5)] p-4 w-full">
        <div className='mb-2'>
          <h2 className="text-M-h2 font-IntelOneBodyTextBold mb-2">FPS</h2>
          <p className="text-xs">Gaming at QHD 1440 resolution. When paired with a XXXXXX GPU.  </p>
        </div>

        <div className="flex flex-col gap-y-2">
          <div className="flex gap-4">
            <div className='text-xs flex-grow min-w-[120px]'>Valorant</div>
            <div className='flex items-center w-[100px]'>
              <div className='bg-[rgba(255,255,255,0.2)] h-[6px] w-full'>
                <div className="max-w-full h-full bg-gaming-blue" style={{width: '60%'}} />
              </div>
            </div>
            <div className='min-w-[32px] flex-grow font-IntelOneBodyTextMedium'>245</div>
          </div>

          <div className="flex gap-4">
            <div className='text-xs flex-grow min-w-[120px]'>Ghostrunner 2</div>
            <div className='flex items-center w-[100px]'>
              <div className='bg-[rgba(255,255,255,0.2)] h-[6px] w-full'>
                <div className="max-w-full h-full bg-gaming-blue" style={{width: '60%'}} />
              </div>
            </div>
            <div className='min-w-[32px] flex-grow font-IntelOneBodyTextMedium'>168</div>
          </div>

          <div className="flex gap-4">
            <div className='text-xs flex-grow min-w-[120px]'>League of Legends</div>
            <div className='flex items-center w-[100px]'>
              <div className='bg-[rgba(255,255,255,0.2)] h-[6px] w-full'>
                <div className="max-w-full h-full bg-gaming-blue" style={{width: '60%'}} />
              </div>
            </div>
            <div className='min-w-[32px] flex-grow font-IntelOneBodyTextMedium'>322</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SingleCompareComponents