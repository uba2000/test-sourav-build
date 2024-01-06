import React, { useMemo } from 'react'
import clsx from 'clsx';

interface ICardWithNotch {
  children: React.ReactNode;
  notchHeight?: 'normal' | 'small';
  backgroundColor?: string;

  btl?: boolean;
  btr?: boolean;
  bbl?: boolean;
  bbr?: boolean;
}

function CardWithNotch({
  children, notchHeight = 'normal', backgroundColor,
  btl = true, btr = false, bbl = false, bbr = true
}: ICardWithNotch) {
  const _topWidthSize = useMemo(() => {
    switch (notchHeight) {
      case 'normal':
        if (btl && btr) {
          return '2rem'
        } if (!(btl || btr)) {
          return '0rem'
        }
        return '1rem'
      case 'small':
        if (btl && btr) {
          return '1rem'
        } if (!(btl || btr)) {
          return '0rem'
        }
        return '0.5rem'

      default:
        return '';
    }
  }, [btl, btr, notchHeight]);

  const _bottomWidthSize = useMemo(() => {
    switch (notchHeight) {
      case 'normal':
        if (bbl && bbr) {
          return '2rem'
        } if (!(bbl || bbr)) {
          return '0rem'
        }
        return '1rem'
      case 'small':
        if (bbl && bbr) {
          return '1rem'
        } if (!(bbl || bbr)) {
          return '0rem'
        }
        return '0.5rem'

      default:
        return '';
    }
  }, [bbl, bbr, notchHeight]);

  const _style = useMemo(() => ({
    '--background-color': backgroundColor || 'rgba(255,255,255,0.2)'
  } as React.CSSProperties | undefined), [backgroundColor])

  return (
    <div className='flex flex-col' style={_style}>
      <div className={clsx(
        { 'h-[1rem] min-h-[1rem]': notchHeight === 'normal' },
        { 'h-[0.5rem] min-h-[0.5rem]': notchHeight === 'small' },

        { 'before:border-b-[1rem] before:border-l-[1rem] before:-left-4': notchHeight === 'normal' && btl },
        { 'after:border-b-[1rem] after:border-r-[1rem] before:-right-4': notchHeight === 'normal' && btr },

        { 'before:border-b-[0.5rem] before:border-l-[0.5rem] before:-left-2': notchHeight === 'small' && btl },
        { 'after:border-b-[0.5rem] after:border-r-[0.5rem] after:-right-2': notchHeight === 'small' && btr },

        'bg-[var(--background-color)] relative',

        { "before:border-b-[var(--background-color)] before:border-l-transparent before:w-0 before:h-0 ml-auto": btl },
        { "before:content-[''] before:absolute": btl },

        { "after:border-b-[var(--background-color)] after:border-r-transparent after:w-0 after:h-0 mr-auto": btr },
        { "after:content-[''] after:absolute": btr },
      )} style={{ width: `calc(100% - ${_topWidthSize})`, margin: (btl && btr) ? '0 auto' : '' }} />

      <div className="flex-1 bg-[var(--background-color)]">
        {children}
      </div>

      <div className={clsx(
        { 'h-[1rem] min-h-[1rem]': notchHeight === 'normal' },
        { 'h-[0.5rem] min-h-[0.5rem]': notchHeight === 'small' },

        { 'before:border-t-[1rem] before:border-r-[1rem] before:-right-4': notchHeight === 'normal' && bbr },
        { 'after:border-t-[1rem] after:border-l-[1rem] after:-left-4': notchHeight === 'normal' && bbl },

        { 'before:border-t-[0.5rem] before:border-r-[0.5rem] before:-right-2': notchHeight === 'small' && bbr },
        { 'after:border-t-[0.5rem] after:border-l-[0.5rem] after:-left-2': notchHeight === 'small' && bbl },

        'bg-[var(--background-color)] relative',

        { "before:border-t-[var(--background-color)] before:border-r-transparent before:w-0 before:h-0 mr-auto": bbr },
        { "before:content-[''] before:absolute": bbr },

        { "after:border-t-[var(--background-color)] after:border-l-transparent after:w-0 after:h-0 ml-auto": bbl },
        { "after:content-[''] after:absolute": bbl },
      )} style={{ width: `calc(100% - ${_bottomWidthSize})`, margin: (bbl && bbr) ? '0 auto' : '' }} />
    </div>
  )
}

export default CardWithNotch