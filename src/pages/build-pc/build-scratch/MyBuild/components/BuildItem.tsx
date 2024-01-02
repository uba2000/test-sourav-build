import PolygonContainer from '../../../../../components/PolygonContainer/PolygonContainer'
import ImageFigure from '../../../../../components/ImageFigure'
import { IBuildComponent } from '../../../../../lib/types/context-types';
// import CompatibilityBadge from '../../../../../components/CompatibilityBadge/CompatibilityBadge';
// import StarRatingComponent from '../../../../../components/StarRatingComponent/StarRatingComponent';

import CartIcon from '../../../../../assets/add-cart.svg'
import { Fragment } from 'react';
import _ from 'lodash';

interface IChooseComponentItem {
  selected?: boolean;
  onClick?: (_id: string) => void;
  addToCart?: (_id: string) => void;
  data: IBuildComponent;
}

function BuildItem({
  selected = false, onClick = () => { }, addToCart = () => { },
  data
}: IChooseComponentItem) {
  function itemClick() {
    onClick(data._id);
  }

  function handleAddToCart() {
    addToCart(data._id);
  }

  return (
    <PolygonContainer btl={false} btr={false} bbr={false} borderActive backgroundActive={selected}>
      <div className="px-[6px] flex">
        <div className="max-w-[94px] min-w-[94px] w-full flex justify-center items-center">
          <div className='cursor-pointer w-full h-full max-w-[75px] min-w-[75px] max-h-[75px] min-h-[75px]' onClick={() => itemClick()}>
            <ImageFigure icon={data.image} isContainerSize />
          </div>
        </div>
        <div className="flex-grow">
          <div className="flex gap-1 justify-between mb-[4px]">
            <div>
              <p className="text-[10px] leading-[10px] font-IntelOneBodyTextMedium mb-[6px] uppercase">
                {data?.category_slug?.replace('-', ' ')}
              </p>
              <h4 className="font-IntelOneBodyTextBold text-sm whitespace-wrap flex-grow leading-[14px] h-[42px] line-clamp-3 cursor-pointer max-w-[164px]" onClick={() => itemClick()}>
                {data?.title}
              </h4>
            </div>

            <div className="flex flex-col items-end gap-y-1">
              {/* <CompatibilityBadge />
              <StarRatingComponent />
              <div className="font-IntelOneBodyTextMedium text-[11px] leading-[11px]">####</div>
              <div className="font-IntelOneBodyTextMedium text-[11px] leading-[11px]">Reviews</div> */}
            </div>
          </div>

          <div className="flex justify-between items-end">
            <div className="flex flex-col justify-end gap-y-[2px]">
              {data?.specs?.map((d) => (
                <Fragment key={_.uniqueId()}>
                  <span className='text-xs font-IntelOneBodyTextRegular line-clamp-2'>
                    <span className="text-inherit text-xs font-IntelOneBodyTextMedium">{d.spec_value}</span>
                    {' '}
                    {d.spec_title}
                  </span>
                </Fragment>
              ))}
            </div>
            <div className="flex flex-col justify-between gap-y-1 items-end min-w-[105px]">
              <span className='font-IntelOneBodyTextMedium'>{'$'}{data.price}</span>
              <button type='button' className="flex gap-x-[6px] items-center relative z-30" onClick={() => handleAddToCart()}>
                <div className='font-IntelOneBodyTextRegular text-sm'>
                  Add to cart
                </div>
                <div className='bg-[#FFF100] flex justify-center items-center p-[3px] h-[22px] w-[22px]'>
                  <ImageFigure icon={CartIcon} width={13} />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute left-0 top-0 h-full w-full cursor-pointer" onClick={() => itemClick()} />
    </PolygonContainer>
  )
}

export default BuildItem