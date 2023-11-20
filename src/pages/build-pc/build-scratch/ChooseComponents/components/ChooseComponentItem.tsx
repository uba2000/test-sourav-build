import PolygonContainer from '../../../../../components/PolygonContainer/PolygonContainer'
import ImageFigure from '../../../../../components/ImageFigure'

import ProcessorImg from '../../../../../assets/processor-i9.svg'
import RightArrow from '../../../../../assets/right-arrow-white.svg'
import Button from '../../../../../components/Button/Button'
import StarRatingComponent from '../../../../../components/StarRatingComponent/StarRatingComponent'
import CompatibilityBadge from '../../../../../components/CompatibilityBadge/CompatibilityBadge'

interface IChooseComponentItem {
  selected?: boolean;
  onClick?: (_id: string) => void;
  addToBuild?: (_id: string) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
}

function ChooseComponentItem({
  selected = false, onClick = () => { }, addToBuild = () => { }, data
}: IChooseComponentItem) {
  
  function itemClick() {
    onClick('');
  }

  function handleAddToBuild() {
    addToBuild('');
  }

  return (
    <PolygonContainer btl={false} btr={false} bbr={false} borderActive={selected}>
      <div className="px-[6px] flex">
        <div className="min-w-[94px] flex justify-center items-center">
          <div className='cursor-pointer' onClick={() => itemClick()}>
            <ImageFigure icon={ProcessorImg} width={55} height={68} />
          </div>
        </div>
        <div className="flex-grow">
          <div className="flex gap-1 justify-between mb-[6px]">
            <h4 className="font-IntelOneBodyTextBold text-sm whitespace-wrap flex-grow leading-[14px] h-[42px] line-clamp-3 cursor-pointer" onClick={() => itemClick()}>
              {data?.title}
            </h4>

            <div className="flex flex-col items-end gap-y-1">
              <CompatibilityBadge />
              <StarRatingComponent />
              <div className="font-IntelOneBodyTextMedium text-[11px] leading-[11px]"># Reviews</div>
            </div>
          </div>

          <div className="flex justify-between">
            <div className="flex flex-col gap-y-[2px]">
              <span className='text-xs font-IntelOneBodyTextRegular'>
                <span className="text-inherit text-xs font-IntelOneBodyTextMedium">{data?.cores}</span>
                Cores
              </span>
              <span className='text-xs font-IntelOneBodyTextRegular'>
                <span className="text-inherit text-xs font-IntelOneBodyTextMedium">{data?.frequency}</span>
                GHz
              </span>
              <span className='text-xs font-IntelOneBodyTextRegular'>
                <span className="text-inherit text-xs font-IntelOneBodyTextMedium">{data?.powerConsumption}</span>
                Watts
              </span>
            </div>
            <div className="flex flex-col gap-y-1 items-end">
              <span className='font-IntelOneBodyTextMedium'>$$$$</span>
              <Button variant='cobalt' onClick={() => handleAddToBuild()}>
                <div className="flex gap-x-[6px] items-center py-1 px-2 text-xs">
                  Add to build
                  <ImageFigure icon={RightArrow} width={12} />
                </div>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </PolygonContainer>
  )
}

export default ChooseComponentItem