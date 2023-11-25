import { Fragment, useMemo, useState } from 'react'
import PreferenceLayout from '../PreferenceLayout/PreferenceLayout'
import _ from 'lodash';
import FPSItem from './FPSItem';

import clsx from 'clsx';
import useBuildPCContext from '../../../../../lib/hooks/contextHooks/useBuildPCContext';
import { IFPSTypesItem } from '../../../../../lib/types/context-types';

function Step2FPS() {
  const { setGamingPreference, preferenceFPSTypes } = useBuildPCContext()
  const [selectedFPS, setSelectedFPS] = useState<string | null>(null);
  const [currentVideoTime, setCurrentVideoTime] = useState<number>(0)

  const fpsTypes = useMemo<IFPSTypesItem[]>(() => preferenceFPSTypes, [preferenceFPSTypes])

  function selectFPS(_id: string, index: number) {
    setSelectedFPS(_id);
    const _selectedFPS = preferenceFPSTypes[index];
    setGamingPreference('gaming_fps', _selectedFPS.fps);
  }

  function updateCurrentTime(_currentTime: number) {
    setCurrentVideoTime(_currentTime);
  }

  return (
    <>
      <PreferenceLayout.HeadingTitle
        text='What level of gaming performance do you want?'
        subText='Select one:'
      />

      <div className="max-w-[930px] grid grid-cols-3 place-content-around gap-x-[18px] mb-[30px]">
        {fpsTypes.map((d, index) => (
          <Fragment key={_.uniqueId()}>
            <button
              type='button'
              onClick={() => selectFPS(d._id, index)}
              className={clsx(
                "flex cursor-pointer justify-center items-center md:min-w-[160px] md:max-w-[160px] max-w-fit",
                "md:min-h-[48px] min-h-[36px] px-6 bg-[rgba(255,255,255,0.2)] mx-auto relative",
                {
                  'bg-gaming-cobalt': selectedFPS === d._id,
                  'bg-[rgba(255,255,255,0.2)]': selectedFPS !== d._id,
                }
              )}
            >
              <span className='font-IntelOneBodyTextMedium md:text-base text-xs'>{d.fps}</span>
              {selectedFPS === d._id && (
                <div
                  className={clsx(
                    'absolute md:-bottom-[12px] -bottom-[8px] w-0 h-0',
                    'border-t-gaming-cobalt border-l-transparent border-r-transparent',
                    'md:border-l-[12px] md:border-r-[12px] md:border-t-[12px]',
                    'border-l-[8px] border-r-[8px] border-t-[8px]',
                  )}
                />
              )}
            </button>
          </Fragment>
        ))}
      </div>

      <div className='max-w-[930px] grid md:grid-cols-3 gap-y-[6px] grid-cols-1 gap-x-[18px] min-h-[370px]'>
        {fpsTypes.map((d) => (
          <Fragment key={d._id}>
            <FPSItem
              d={d}
              selectedFPS={selectedFPS}
              currentVideoTime={currentVideoTime}
              updateCurrentTime={updateCurrentTime}
            />
          </Fragment>
        ))}
      </div>
    </>
  )
}

export default Step2FPS