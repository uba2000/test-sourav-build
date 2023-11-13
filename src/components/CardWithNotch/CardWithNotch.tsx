import React from 'react'

import TopNotch from '../../assets/card-top-notch.svg'
import BottomNotch from '../../assets/card-bottom-notch.svg'
import clsx from 'clsx';

interface ICardWithNotch {
  children: React.ReactNode;
  notchHeight?: 'normal'
}

function CardWithNotch({children, notchHeight='normal'}: ICardWithNotch) {
  return (
    <div className='flex flex-col'>
      <img src={TopNotch} alt="" className={clsx('w-full', {'h-4': notchHeight === 'normal'})} />
      <div className="flex-1 bg-[rgba(255,255,255,0.2)]">
        {children}
      </div>
      <img src={BottomNotch} alt="" className={clsx('w-full', {'h-4': notchHeight === 'normal'})} />
    </div>
  )
}

export default CardWithNotch