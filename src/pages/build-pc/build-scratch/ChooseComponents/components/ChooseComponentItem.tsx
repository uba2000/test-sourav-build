import PolygonContainer from '../../../../../components/PolygonContainer/PolygonContainer'
import ImageFigure from '../../../../../components/ImageFigure'

import RightArrow from '../../../../../assets/right-arrow-white.svg'
import Button from '../../../../../components/Button/Button'
import StarRatingComponent from '../../../../../components/StarRatingComponent/StarRatingComponent'
import CompatibilityBadge from '../../../../../components/CompatibilityBadge/CompatibilityBadge'
import { IBuildComponent } from '../../../../../lib/types/context-types'
import { Fragment } from 'react'
import _ from 'lodash'

interface IChooseComponentItem {
  selected?: boolean;
  onClick?: (_id: string) => void;
  addToBuild?: (_id: string) => void;
  data: IBuildComponent;
}

function ChooseComponentItem({
  selected = false, onClick = () => { }, addToBuild = () => { }, data
}: IChooseComponentItem) {
  
  function itemClick() {
    onClick(data._id);
  }

  function handleAddToBuild() {
    addToBuild(data._id);
  }

  return (
    <PolygonContainer btl={false} btr={false} bbr={false} borderActive={selected}>
      <div className="px-[6px] flex">
        <div className="min-w-[94px] max-w-[94px] flex justify-center items-center">
          <div className='cursor-pointer w-full h-full max-w-[75px] min-w-[75px] max-h-[75px] min-h-[75px]' onClick={() => itemClick()}>
            <ImageFigure icon={data.image} isContainerSize />
          </div>
        </div>
        <div className="flex-grow">
          <div className="flex gap-1 justify-between mb-[6px]">
            <h4 className="font-IntelOneBodyTextBold text-sm whitespace-wrap flex-grow leading-[14px] h-[42px] line-clamp-3 cursor-pointer max-w-[164px]" onClick={() => itemClick()}>
              {data?.title}
            </h4>

            <div className="flex flex-col items-end gap-y-1">
              <CompatibilityBadge />
              <StarRatingComponent />
              <div className="font-IntelOneBodyTextMedium text-[11px] leading-[11px]"># Reviews</div>
            </div>
          </div>

          <div className="flex justify-between">
            <div className="flex flex-col justify-end gap-y-[2px]">
              {data?.specs?.map((d) => (
                <Fragment key={_.uniqueId()}>
                  <span className='text-xs font-IntelOneBodyTextRegular'>
                    <span className="text-inherit text-xs font-IntelOneBodyTextMedium">{d.spec_value}</span>
                    {d.spec_title}
                  </span>
                </Fragment>
              ))}
            </div>
            <div className="flex flex-col gap-y-1 items-end">
              <span className='font-IntelOneBodyTextMedium'>${data.price}</span>
              <Button variant='gaming-cobalt' onClick={() => handleAddToBuild()}>
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