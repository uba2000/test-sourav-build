import React, { useMemo } from 'react'
import clsx from 'clsx';

interface ICardWithNotch {
  children: React.ReactNode;
  notchHeight?: 'normal' | 'small';
  
  btl?: boolean;
  btr?: boolean;
  bbl?: boolean;
  bbr?: boolean;
}

function CardWithNotch({
  children, notchHeight = 'normal',
  btl=true, btr=false, bbl=false, bbr=true
}: ICardWithNotch) {
  const _topWidthSize = useMemo(() => {
    switch (notchHeight) {
      case 'normal':
        if (btl && btr) {
          return '32px'
        } if (!(btl || btr)) {
          return '0px'
        }
        return '16px'
      case 'small':
        if (btl && btr) {
          return '16px'
        } if (!(btl || btr)) {
          return '0px'
        }
        return '8px'
    
      default:
        return '';
    }
  }, [btl, btr, notchHeight]);

  const _bottomWidthSize = useMemo(() => {
    switch (notchHeight) {
      case 'normal':
        if (bbl && bbr) {
          return '32px'
        } if (!(bbl || bbr)) {
          return '0px'
        }
        return '16px'
      case 'small':
        if (bbl && bbr) {
          return '16px'
        } if (!(bbl || bbr)) {
          return '0px'
        }
        return '8px'
    
      default:
        return '';
    }
  }, [bbl, bbr, notchHeight]);

  return (
    <div className='flex flex-col'>
      <div className={clsx(
        { 'h-[16px]': notchHeight === 'normal' },
        { 'h-[8px]': notchHeight === 'small' },
        
        { 'before:border-b-[16px] before:border-l-[16px] before:-left-4': notchHeight === 'normal' && btl },
        { 'after:border-b-[16px] after:border-r-[16px] before:-right-4': notchHeight === 'normal' && btr },

        { 'before:border-b-[8px] before:border-l-[8px] before:-left-2': notchHeight === 'small' && btl },
        { 'after:border-b-[8px] after:border-r-[8px] after:-right-2': notchHeight === 'small' && btr },

        'bg-[rgba(255,255,255,0.2)] relative',

        { "before:border-b-[rgba(255,255,255,0.2)] before:border-l-transparent before:w-0 before:h-0 ml-auto": btl },
        { "before:content-[''] before:absolute": btl },

        { "after:border-b-[rgba(255,255,255,0.2)] after:border-r-transparent after:w-0 after:h-0 mr-auto": btr },
        { "after:content-[''] after:absolute": btr },
      )} style={{ width: `calc(100% - ${_topWidthSize})`, margin: (btl && btr) ? '0 auto' : '' }} />

      <div className="flex-1 bg-[rgba(255,255,255,0.2)]">
        {children}
      </div>

      <div className={clsx(
        { 'h-[16px]': notchHeight === 'normal' },
        { 'h-[8px]': notchHeight === 'small' },
        
        { 'before:border-t-[16px] before:border-r-[16px] before:-right-4': notchHeight === 'normal' && bbr },
        { 'after:border-t-[16px] after:border-l-[16px] after:-left-4': notchHeight === 'normal' && bbl },

        { 'before:border-t-[8px] before:border-r-[8px] before:-right-2': notchHeight === 'small' && bbr },
        { 'after:border-t-[8px] after:border-l-[8px] after:-left-2': notchHeight === 'small' && bbl },

        'bg-[rgba(255,255,255,0.2)] relative',

        { "before:border-t-[rgba(255,255,255,0.2)] before:border-r-transparent before:w-0 before:h-0 mr-auto": bbr },
        { "before:content-[''] before:absolute": bbr },

        { "after:border-t-[rgba(255,255,255,0.2)] after:border-l-transparent after:w-0 after:h-0 ml-auto": bbl },
        { "after:content-[''] after:absolute": bbl },
      )} style={{width: `calc(100% - ${_bottomWidthSize})`, margin: (bbl && bbr) ? '0 auto' : ''}}  />
    </div>
  )
}

export default CardWithNotch