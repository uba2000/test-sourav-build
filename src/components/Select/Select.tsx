import OutsideClickHandler from 'react-outside-click-handler';
import ImageFigure from '../ImageFigure';
import RightArrowBlack from '../../assets/right-arrow-white.svg'
import clsx from 'clsx';
import { Fragment, useCallback, useEffect, useLayoutEffect, useState } from 'react';
import _ from 'lodash';

interface ISelectPropsOption {
  label: string;
  value: string;
}

interface ISelectProps {
  options: ISelectPropsOption[];
  initialValue: ISelectPropsOption['value'];
}

function Select({ options = [], initialValue }: ISelectProps) {
  const [optionsIsOpen, setOptionsIsOpen] = useState(false);
  const [_selectedLabel, setSelectedLabel] = useState(options[0]?.label || 'No Options')

  function handleSetSelectedLabel(_label: string) {
    setSelectedLabel(_label);
  }

  function handleOpenOptions() {
    setOptionsIsOpen(true);
  }

  function handleCloseOptions() {
    setOptionsIsOpen(false);
  }

  const handleSelectOption = useCallback((_option: ISelectPropsOption) => {
    handleSetSelectedLabel(_option.label);
    handleCloseOptions()
  }, [])

  useEffect(() => { 
    if (options.length > 0) {
      handleSetSelectedLabel(options[0].label)
    }
  }, [options])

  useLayoutEffect(() => { 
    if (initialValue) {
      const _selected_value = options.find((d) => d.value === initialValue);
      if (_selected_value) {
        handleSetSelectedLabel(_selected_value.label);
      }
    }
  }, [handleSelectOption, initialValue, options])

  return (
    <div className='relative w-full'>
      <button
        type='button'
        onClick={() => handleOpenOptions()}
        className={clsx(
          'border border-[rgba(255,255,255,0.75)] bg-[#000000]',
          'py-[6px] px-2 flex justify-between gap-x-5 w-full items-center'
        )}
      >
        <span className='line-clamp-2 text-xs opacity-75'>{_selectedLabel}</span>

        <div className='rotate-90 opacity-75'>
          <ImageFigure icon={RightArrowBlack} width={12} />
        </div>
      </button>

      {(optionsIsOpen && options.length > 0) && (
      <OutsideClickHandler
        onOutsideClick={() => setOptionsIsOpen(false)}
      >
        <div
          className={clsx(
            { "pr-[6px] py-1": options.length > 3 },
            "absolute mt-2 top-full w-full z-30 bg-[#000000] border border-[rgba(255,255,255,0.75)]"
          )}
          >
            <div
              className={clsx(
                "max-h-[138px] overflow-y-auto scroll-design pr-[6px]"
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
      )}
    </div>
  )
}

export default Select