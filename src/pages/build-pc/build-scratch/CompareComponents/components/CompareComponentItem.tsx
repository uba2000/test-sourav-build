import { Fragment, useMemo } from 'react'
import ImageFigure from '../../../../../components/ImageFigure';
import PolygonContainer from '../../../../../components/PolygonContainer/PolygonContainer';
import StarRatingComponent from '../../../../../components/StarRatingComponent/StarRatingComponent';
import CompatibilityBadge from '../../../../../components/CompatibilityBadge/CompatibilityBadge';
import Button from '../../../../../components/Button/Button';
import clsx from 'clsx';

import RightArrow from '../../../../../assets/right-arrow-white.svg?react'
import _ from 'lodash';

interface ICompareComponentItem {
  title: string;
  image: string;
  price: string;
}

function CompareComponentItem({ title, image, price }: ICompareComponentItem) {
  const fps = useMemo(() => [
    {
      title: 'Valorant',
      fps: '60%',
      fps_value: '245'
    },
    {
      title: 'Ghostrunner 2',
      fps: '60%',
      fps_value: '168'
    },
    {
      title: 'League of Legends',
      fps: '60%',
      fps_value: '322'
    },
  ], []);

  return (
    <div className="flex flex-col items-center gap-y-4">
      <div className='w-fit md:block hidden'>
        <ImageFigure icon={image} width={210} height={132} />
      </div>
      <div className='w-fit md:hidden block'>
        <ImageFigure icon={image} width={154} height={104} />
      </div>

      <PolygonContainer className='w-full'>
        <div className="py-3 flex flex-col items-center text-center gap-y-3">
          <h1 className="md:text-M-h1 text-sm font-IntelOneDisplayBold md:max-w-[344px] max-w-[120px]">
            {title}
          </h1>

          <div className="flex md:flex-row flex-col justify-center gap-x-6 gap-y-[6px]">
            <div className="flex gap-1 items-center">
              <div className="md:block hidden">
                <StarRatingComponent />
              </div>
              <div className="md:hidden block">
                <StarRatingComponent size={6} />
              </div>
              <span className="md:text-xs text-[9px] leading-[10px]">4,258 reviews</span>
            </div>
            <CompatibilityBadge />
          </div>

          <div className="flex md:flex-row flex-col gap-x-3 gap-y-[6px] items-center">
            <span className="font-IntelOneBodyTextMedium text-xs">{price}</span>
            <Button variant='cobalt'>
              <div className="flex gap-x-[6px] py-1 px-2 text-xs items-center">
                Add to build
                <RightArrow className='w-3 h-3' />
              </div>
            </Button>
          </div>

        </div>
      </PolygonContainer>

      <div className="max-w-[327px] grid md:grid-cols-2 grid-cols-1 gap-3">
        <div className="text-center py-2">
          <div className="text-M-h2 font-IntelOneBodyTextBold">9728 Units</div>
          <div className="text-xs font-IntelOneBodyTextMedium">CUDA® CORES</div>
        </div>
        <div className="flex flex-col justify-center">
          <div className="py-1 px-[9px] flex gap-[3px]">
            {Array.from({ length: 24 }, (_, index) => index + 1).map((__, index) => {
              const _percent = 0.66;
              const _index = Math.ceil(_percent * 24)
              return (
                <Fragment key={index}>
                  <div
                    className={clsx(
                      "w-[3px] min-w-[3px] h-[6px]",
                      { "bg-gaming-blue": index <= _index },
                      { "bg-gaming-cobalt": index > _index }
                    )}
                  />
                </Fragment>
              )
            })}
          </div>
          <div className="flex justify-center items-center gap-2">
            <span className='text-M-h2 font-IntelOneBodyTextBold'>16 GB</span>
            <span className='text-xs font-IntelOneBodyTextMedium'>GDDR6</span>
          </div>
        </div>
      </div>

      <div className="max-w-[148px] min-h-[85px] mx-auto flex items-center">
        {/* Circle chat here */}
        <span className='text-xs font-IntelOneBodyTextMedium max-w-[39px]'>Boost Clock Speed</span>
      </div>

      <div className="border border-[rgba(255,255,255,0.5)] p-4 w-full max-w-[329px]">
        <div className='mb-2'>
          <h2 className="text-M-h2 font-IntelOneBodyTextBold mb-2">FPS</h2>
          <p className="text-xs">Gaming at QHD 1440 resolution. When paired with a XXXXXX GPU.  </p>
        </div>

        <div className="flex flex-col gap-y-2">
          {fps.map((d) => (
            <Fragment key={_.uniqueId()}>
              <div className="flex md:flex-nowrap flex-wrap gap-x-4 gap-y-1">
                <div className='text-xs flex-grow min-w-[120px] md:w-[unset] w-full'>{d.title}</div>
                <div className='flex justify-between gap-4 w-full'>
                  <div className='flex items-center w-[calc(100%_-_32px)]'>
                    <div className='bg-[rgba(255,255,255,0.2)] h-[6px] w-full'>
                      <div className="max-w-full h-full bg-gaming-blue" style={{ width: d.fps }} />
                    </div>
                  </div>
                  <div className='min-w-[32px] flex-grow font-IntelOneBodyTextMedium'>{d.fps_value}</div>
                </div>
              </div>
            </Fragment>
          ))}
        </div>
      </div>

    </div>
  )
}

export default CompareComponentItem