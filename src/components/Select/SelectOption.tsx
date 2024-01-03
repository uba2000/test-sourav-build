import clsx from 'clsx'
import _ from 'lodash'
import { Fragment, useEffect, useLayoutEffect, useRef, useState } from 'react'
import OutsideClickHandler from 'react-outside-click-handler'

interface ISelectPropsOption {
  value: string;
  label: string;
}

interface ISelectOption {
  setOptionsIsOpen: (value: boolean) => void
  options: ISelectPropsOption[];
  handleSelectOption: (_option: ISelectPropsOption) => void;
  coordinates: {
    width: number;
    height: number;
    left: number;
    top: number;
    bottom: number;
  }
}

function SelectOption({ setOptionsIsOpen, options, handleSelectOption, coordinates }: ISelectOption) {
  const [listStyles, setListStyles] = useState({});
  const containerRef = useRef<HTMLDivElement>(null)

  function handleWindowScroll() {
    setOptionsIsOpen(false)
  }

  useEffect(() => {
    const _parentDiv = document.querySelector('#buildLayoutChildDIV')
    if (_parentDiv) {
      _parentDiv.addEventListener('scroll', handleWindowScroll)
    }
    window.addEventListener('scroll', handleWindowScroll)

    return () => {
      window.removeEventListener('scroll', handleWindowScroll);
      if (_parentDiv) {
        _parentDiv.removeEventListener('scroll', handleWindowScroll);
      }
    }
  }, [])


  useLayoutEffect(() => {
    if (coordinates && containerRef?.current) {
      const windowSizeHeight = window.innerHeight;
      const _containerRefHeight = containerRef.current?.offsetHeight;
      setListStyles({
        width: `${coordinates?.width}px`,
        maxWidth: `${coordinates?.width}px`,
        ...(
          coordinates?.top + (_containerRefHeight) >= windowSizeHeight ? {
            bottom: `${windowSizeHeight - coordinates?.top + 8}px`
          } : {
            top: `${coordinates?.bottom - 2}px`,
          }
        ),
        left: `${(coordinates.left) + (coordinates.width / 2)}px`,
      });
    }
  }, [coordinates]);

  return (
    <OutsideClickHandler
      onOutsideClick={() => setOptionsIsOpen(false)}
    >
      <div
        ref={containerRef}
        style={{ ...listStyles }}
        className={clsx(
          { "pr-[6px] py-1": options.length > 3 },
          "mt-2 bg-[#000000] border border-[rgba(255,255,255,0.75)]",
          "fixed left-1/2 -translate-x-1/2 z-[100001] max-w-[222px] w-full"
        )}
      >
        <div
          className={clsx(
            "max-h-[138px] overflow-y-auto scroll-design"
          )}
        >
          {options.map((d) => (
            <Fragment key={_.uniqueId()}>
              <div
                onClick={() => handleSelectOption(d)}
                className={
                  clsx(
                    "py-[6px] px-2 with-ease hover:bg-[#455C5D] cursor-pointer"
                  )
                }
              >
                <span className='text-xs'>
                  {d.label}
                </span>
              </div>
            </Fragment>
          ))}
        </div>
      </div>
    </OutsideClickHandler>
  )
}

export default SelectOption