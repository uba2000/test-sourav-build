import clsx from 'clsx'
import _ from 'lodash'
import { Fragment } from 'react'
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
  }
}

function SelectOption({ setOptionsIsOpen, options, handleSelectOption }: ISelectOption) {
  return (
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