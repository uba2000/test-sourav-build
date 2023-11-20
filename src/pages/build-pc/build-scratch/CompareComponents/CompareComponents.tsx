// import React from 'react'
import BuildLayout from '../components/BuildLayout'
import ImageFigure from '../../../../components/ImageFigure'
import CircleCloseIcon from '../../../../assets/circle-close-icon.svg'
import { useMatches, useNavigate } from 'react-router-dom';
import RouteNames from '../../../../lib/utils/routenames';

import GraphicsCard1 from '../../../../assets/graphics-cards/graphic-card-1.svg'
import GraphicsCard2 from '../../../../assets/graphics-cards/graphic-card-2.svg'
import CompareComponentItem from './components/CompareComponentItem';

function CompareComponents() {
  const matches = useMatches();
  const navigate = useNavigate();

  function closeCompaison() {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      navigate(`${RouteNames.buildChooseComponent}/${matches[0].params?.category_slug as string}`)
    }
  }

  return (
    <BuildLayout isCompareMode>
      <div className='flex flex-col gap-y-4'>
        <div className="flex justify-end">
          <button type='button' className="cursor-pointer" onClick={() => closeCompaison()}>
            <ImageFigure icon={CircleCloseIcon} width={16} />
          </button>
        </div>

        <div className="grid grid-cols-2 md:gap-[35px] gap-5 md:pl-6 md:pr-5">
          <CompareComponentItem
            title='ASUS ROG Strix GeForce RTX 4070 Ti OC'
            image={GraphicsCard1}
            price='$345.99'
          />
          <CompareComponentItem
            title='MSI GeForce RTX 4090 Gaming X Trio 2'
            image={GraphicsCard2}
            price='$2,329.99'
          />
        </div>
      </div>
    </BuildLayout>
  )
}

export default CompareComponents