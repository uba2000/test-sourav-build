import React from 'react'
import clsx from 'clsx';

interface ICardWithNotch {
  children: React.ReactNode;
  notchHeight?: 'normal' | 'small'
}

function CardWithNotch({children, notchHeight='normal'}: ICardWithNotch) {
  return (
    <div className='flex flex-col'>
      {/* <img src={TopNotch} alt="" className={clsx('w-full', { 'h-4': notchHeight === 'normal' })} /> */}
      <div className={clsx(
        { 'h-[16px] w-[calc(100%_-_16px)] before:border-b-[16px] before:border-l-[16px] before:-left-4': notchHeight === 'normal' },
        { 'h-[8px] w-[calc(100%_-_8px)] before:border-b-[8px] before:border-l-[8px] before:-left-2': notchHeight === 'small' },
        'bg-[rgba(255,255,255,0.2)] ml-auto relative',

        "before:border-b-[rgba(255,255,255,0.2)] before:border-l-transparent before:w-0 before:h-0",
        "before:content-[''] before:absolute "
      )} />
      <div className="flex-1 bg-[rgba(255,255,255,0.2)]">
        {children}
      </div>
      <div className={clsx(
        { 'h-4 w-[calc(100%_-_16px)] before:border-t-[16px] before:border-r-[16px] before:-right-4': notchHeight === 'normal' },
        { 'h-2 w-[calc(100%_-_8px)] before:border-t-[8px] before:border-r-[8px] before:-right-2': notchHeight === 'small' },
        'bg-[rgba(255,255,255,0.2)] mr-auto relative',

        "before:border-t-[rgba(255,255,255,0.2)] before:border-r-transparent before:w-0 before:h-0",
        "before:content-[''] before:absolute "
      )} />
      {/* <img src={BottomNotch} alt="" className={clsx('w-full', {'h-4': notchHeight === 'normal'})} /> */}
    </div>
  )
}

export default CardWithNotch