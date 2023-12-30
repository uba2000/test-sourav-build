import ImageFigure from '../ImageFigure';
import RightArrowBlack from '../../assets/right-arrow-white.svg'
import clsx from 'clsx';
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
// import Portal from '../Widgets/Portal';
import useWindowSize from '../../lib/hooks/useWindowSize';
import SelectOption from './SelectOption';
import Portal from '../Widgets/Portal';

interface ISelectPropsOption {
  label: string;
  value: string;
}

interface ISelectProps {
  options: ISelectPropsOption[];
  initialValue: ISelectPropsOption['value'];
  onChange?: (_value: string) => void;
}

function Select({ options = [], initialValue, onChange = () => { } }: ISelectProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [optionsIsOpen, setOptionsIsOpen] = useState(false);
  const [_selectedLabel, setSelectedLabel] = useState(options[0]?.label || 'No Options')
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [buttonCoordinates, setButtonCoordinates] = useState<any>(null);

  const parentDiv = useRef<HTMLDivElement>(document.querySelector('#buildLayoutChildDIV'))

  const { windowSize } = useWindowSize();

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
    onChange(_option.value)
    handleCloseOptions()
  }, [])

  function handleSetCoordinates() {
    setButtonCoordinates(buttonRef?.current?.getBoundingClientRect());
  }

  useEffect(() => {
    handleSetCoordinates();
  }, [buttonRef, windowSize]);

  useEffect(() => {
    if (parentDiv.current) {
      parentDiv.current.addEventListener('scroll', handleSetCoordinates)
    }
    window.addEventListener('scroll', handleSetCoordinates)

    return () => {
      window.removeEventListener('scroll', handleSetCoordinates);
      if (parentDiv.current) { 
        parentDiv.current.removeEventListener('scroll', handleSetCoordinates);
      }
    }
  }, [])
  
  useLayoutEffect(() => {
    if (initialValue) {
      const _selected_value = options.find((d) => d.value === initialValue);
      if (_selected_value) {
        handleSetSelectedLabel(_selected_value.label);
      }
    } else if (options.length > 0) {
      handleSetSelectedLabel(options[0].label)
    }
  }, [initialValue])
  
  return (
    <div className='relative w-full'>
      <button
        ref={buttonRef}
        type='button'
        onClick={() => handleOpenOptions()}
        className={clsx(
          'border border-[rgba(255,255,255,0.75)] bg-[#000000]',
          'py-[6px] px-2 flex justify-between gap-x-5 w-full items-center'
        )}
      >
        <span className='text-xs opacity-75 text-left line-clamp-1'>{_selectedLabel}</span>

        <div className='rotate-90 opacity-75'>
          <ImageFigure icon={RightArrowBlack} width={12} />
        </div>
      </button>

      {(optionsIsOpen && options.length > 0) && (
        <Portal selector='#select-options'>
          <SelectOption
            coordinates={buttonCoordinates}
            setOptionsIsOpen={setOptionsIsOpen}
            options={options}
            handleSelectOption={handleSelectOption}
          />
        </Portal>
      )}
    </div>
  )
}

export default Select