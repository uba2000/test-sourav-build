import React, { useMemo } from 'react'
import clsx from 'clsx';

interface IPolygonContainer {
  children: React.ReactNode;
  rightBorder?: boolean;
  leftBorder?: boolean;
  className?: string;
  defaultBorderBackground?: string;
  topBackground?: 'primary' | null;
  rightBackground?: 'primary' | null;

  borderActive?: boolean;

  btl?: boolean; // top left
  btr?: boolean; // top right
  bbr?: boolean; // bottom right
  bbl?: boolean; // bottom left
}

function PolygonContainer({
  children, rightBorder = true, leftBorder = true, className = '',
  btl = true, btr = true, bbr = true, bbl = true, borderActive = false,
  topBackground, rightBackground, defaultBorderBackground='#4B4567'
}: IPolygonContainer) {

  const _style = useMemo(() => ({
    '--background-color': defaultBorderBackground || '#4B4567',
    '--border-color': defaultBorderBackground === '#4B4567' ? '#00FFFE' : '',
  } as React.CSSProperties | undefined), [defaultBorderBackground])

  return (
    <div className={clsx('flex flex-col relative', className)} style={_style}>
      <div
        className={clsx(
          'h-2 relative',
          {
            "w-[calc(100%_-_16px)] mx-auto": btl && btr,

            "before:border-b-[8px] before:border-l-[8px] before:-left-2": btl,
            "before:border-l-transparent before:w-0 before:h-0": btl,
            "before:content-[''] before:absolute": btl,

            "w-full": !btl && !btr,
            "w-[calc(100%_-_8px)] mr-auto": !btl && btr,
            "w-[calc(100%_-_8px)] ml-auto": btl && !btr,
            "border-l": !btl,

            "after:border-b-[8px] after:border-r-[8px] after:-right-2": btr,
            "after:border-r-transparent after:w-0 after:h-0": btr,
            "after:content-[''] after:absolute": btr,
            "border-r": !btr,
          },
          {
            "before:border-b-[var(--background-color)] after:border-b-[var(--background-color)] bg-[var(--background-color)] text-[var(--border-color)] border-[var(--border-color)]": borderActive,
            "before:border-b-transparent after:border-b-transparent bg-transparent text-[#C5C5CB]": !borderActive && !rightBackground && !topBackground,
            "before:border-b-[#0040FF] after:border-b-[#0040FF] bg-[#0040FF]": !borderActive && topBackground === 'primary',
            "after:border-b-[#0040FF] bg-[#0040FF]": !borderActive && rightBackground === 'primary'
          }
        )}
      >
        <div
          className={clsx(
            'border-t absolute top-0 left-0 w-full',
            {
              "border-[var(--border-color)]": borderActive,
              "border-[#C5C5CB]": !borderActive,
            },
          )}
        />
        {btr && (
          <svg className='absolute -right-2 z-10' width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_3319_108092)">
            <path fillRule="evenodd" clipRule="evenodd" d="M0.400879 -0.000488396L0.00146494 -0.000488375L0.0014649 1.01431L6.98666 7.99951L8.00146 7.99951L8.00146 7.6001L0.400879 -0.000488396Z" fill="currentColor" fillOpacity="0.75"/>
            </g>
            <defs>
            <clipPath id="clip0_3319_108092">
            <rect width="8" height="8" fill="currentColor"/>
            </clipPath>
            </defs>
          </svg>
        )}

        {btl && (
          <svg className='absolute -left-2 z-10' width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_3319_108081)">
            <path fillRule="evenodd" clipRule="evenodd" d="M7.59912 -0.000488396L7.99854 -0.000488375L7.99854 1.01431L1.01334 7.99951L-0.00146399 7.99951L-0.00146433 7.6001L7.59912 -0.000488396Z" fill="currentColor" fillOpacity="0.75"/>
            </g>
            <defs>
            <clipPath id="clip0_3319_108081">
            <rect width="8" height="8" fill="currentColor" transform="matrix(-1 0 0 1 8 0)"/>
            </clipPath>
            </defs>
          </svg>
        )}
      </div>
      {/* Children */}
      <div
        className={clsx('flex-1', `border-[${borderActive ? 'var(--border-color)' : '#C5C5CB'}]`,
          {
            "border-[var(--border-color)]": borderActive,
            "border-[#C5C5CB]": !borderActive
          },
          { "bg-[var(--background-color)]": borderActive },
          {
          'border-l': leftBorder,
          'border-r': rightBorder
        })}
      >
        {children}
      </div>
      {/* Children */}
      <div
        className={clsx(
          "h-2 relative",
          {
            "w-[calc(100%_-_16px)] mx-auto": bbl && bbr,

            "before:border-t-[8px] before:border-l-[8px] before:-left-2": bbl,
            "before:border-l-transparent before:w-0 before:h-0": bbl,
            "before:content-[''] before:absolute": bbl,
            "before:border-t-transparent": topBackground && bbl,

            "w-full": !bbl && !bbr,
            "w-[calc(100%_-_8px)] mr-auto": !bbl && bbr,
            "w-[calc(100%_-_8px)] ml-auto": bbl && !bbr,
            "border-l": !bbl,

            "after:border-t-[8px] after:border-r-[8px] after:-right-2": bbr,
            "after:border-r-transparent after:w-0 after:h-0": bbr,
            "after:content-[''] after:absolute": bbr,
            "border-r": !bbr,
          },
          {
            "before:border-t-[var(--background-color)] after:border-t-[var(--background-color)] bg-[var(--background-color)] text-[var(--border-color)] border-[var(--border-color)]": borderActive,
            "before:border-t-transparent after:border-t-transparent bg-transparent text-[#C5C5CB]": !borderActive && !topBackground && !rightBackground,
            "after:border-t-[#0040FF] bg-[#0040FF]": !borderActive && rightBackground === 'primary'
          }
        )}
      >
        {bbl && (
          <svg className='absolute -left-2 z-10' width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_3319_108114)">
            <path fillRule="evenodd" clipRule="evenodd" d="M7.59912 8.00049L7.99854 8.00049L7.99854 6.98569L1.01334 0.00048966L-0.00146399 0.000489323L-0.00146433 0.399903L7.59912 8.00049Z" fill="currentColor" fillOpacity="0.75"/>
            </g>
            <defs>
            <clipPath id="clip0_3319_108114">
            <rect width="8" height="8" fill="currentColor" transform="matrix(-1 0 0 -1 8 8)"/>
            </clipPath>
            </defs>
          </svg>
        )}

        {bbr && (
          <svg className='absolute -right-2 z-10' width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_3319_108122)">
            <path fillRule="evenodd" clipRule="evenodd" d="M0.400879 8.00049L0.00146494 8.00049L0.0014649 6.98569L6.98666 0.00048966L8.00146 0.000489323L8.00146 0.399903L0.400879 8.00049Z" fill="currentColor" fillOpacity="0.75"/>
            </g>
            <defs>
            <clipPath id="clip0_3319_108122">
            <rect width="8" height="8" fill="currentColor" transform="matrix(1 0 0 -1 0 8)"/>
            </clipPath>
            </defs>
          </svg>
        )}

        <div
          className={clsx(
            'border-b absolute bottom-0 left-0 w-full',
            {
              "border-[var(--border-color)]": borderActive,
              "border-[#C5C5CB]": !borderActive,
            },
          )}
        />
      </div>
    </div>
  )
}

export default PolygonContainer