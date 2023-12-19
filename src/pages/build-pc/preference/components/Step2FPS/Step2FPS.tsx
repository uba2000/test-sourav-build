import React, { Fragment, useMemo, useState } from 'react'
import PreferenceLayout from '../PreferenceLayout/PreferenceLayout'
import FPSItem from './FPSItem';

import clsx from 'clsx';
import useBuildPCContext from '../../../../../lib/hooks/contextHooks/useBuildPCContext';
import { IFPSTypesItem } from '../../../../../lib/types/context-types';
import useFPSItemDisability from '../../../../../lib/hooks/useFPSItemDisability';

function Step2FPS() {
  const { setGamingPreference, preferenceFPSTypes, preferences } = useBuildPCContext()
  const [selectedFPS, setSelectedFPS] = useState<string | null>(preferences?.gaming_fps?._id || null);
  const [currentVideoTime, setCurrentVideoTime] = useState<number>(0)
  const [hoveredVideo, setHoveredVideo] = useState<string>('')

  const fpsTypes = useMemo<IFPSTypesItem[]>(() => preferenceFPSTypes, [preferenceFPSTypes])

  function selectFPS(_id: string, index: number) {
    setSelectedFPS(_id);
    const _selectedFPS = preferenceFPSTypes[index];
    setGamingPreference('gaming_fps', _selectedFPS);
  }

  function updateCurrentTime(_currentTime: number) {
    // to prevent infinite render update every 5/10 seconds
    if ((_currentTime - currentVideoTime) >= 5) {
      setCurrentVideoTime(_currentTime);
    }
  }

  return (
    <div className='animate-fadeIn'>
      <PreferenceLayout.HeadingTitle
        text='What level of gaming performance do you want?'
        subText='Select one:'
      />

      <div className="max-w-[930px] grid grid-cols-3 place-content-around gap-x-[18px] mb-[30px]">
        {fpsTypes.map((d, index) => (
          <Fragment key={d._id}>
            <FPSButton
              d={d}
              hoverActive={hoveredVideo === d._id}
              index={index}
              selectFPS={selectFPS}
              selectedFPS={selectedFPS}
            />
          </Fragment>
        ))}
      </div>

      <div className='max-w-[930px] grid md:grid-cols-3 gap-y-[6px] grid-cols-1 gap-x-[18px] min-h-[370px]'>
        {fpsTypes.map((d, index) => (
          <Fragment key={d._id}>
            <FPSItem
              d={d}
              onMouseOver={() => setHoveredVideo(d._id)}
              onMouseLeave={() => setHoveredVideo('')}
              index={index}
              selectedFPS={selectedFPS}
              selectFPS={selectFPS}
              currentVideoTime={currentVideoTime}
              updateCurrentTime={updateCurrentTime}
            />
          </Fragment>
        ))}
      </div>
    </div>
  )
}

interface IFPSButton {
  index: number;
  hoverActive?: boolean;
  d: IFPSTypesItem;
  selectedFPS: string | null;
  selectFPS: (_id: string, index: number) => void;
}

const FPSButton = React.memo(({ selectFPS, selectedFPS, d, index, hoverActive }: IFPSButton) => {
  const { isDisabled } = useFPSItemDisability(d);

  return (
    <button
      type='button'
      disabled={isDisabled}
      onClick={() => !isDisabled && selectFPS(d._id, index)}
      className={clsx(
        "flex cursor-pointer justify-center items-center md:min-w-[160px] md:max-w-[160px] max-w-fit with-ease",
        "md:min-h-[48px] min-h-[36px] px-6 bg-[rgba(255,255,255,0.2)] mx-auto relative",
        {
          'bg-gaming-cobalt': selectedFPS === d._id && !isDisabled,
          'bg-[rgba(255,255,255,0.2)] hover:bg-intel-20-cobalt': selectedFPS !== d._id && !isDisabled,
          'bg-intel-20-cobalt': hoverActive && selectedFPS !== d._id && !isDisabled,
          'opacity-20 bg-[rgba(0,0,0,0.2)]': isDisabled
        }
      )}
    >
      <span className='font-IntelOneBodyTextMedium md:text-base text-xs'>{d.fps}</span>
      {selectedFPS === d._id && (
        <div
          className={clsx(
            'absolute md:-bottom-[12px] -bottom-[7px] w-0 h-0',
            'border-t-gaming-cobalt border-l-transparent border-r-transparent',
            'md:border-l-[12px] md:border-r-[12px] md:border-t-[12px]',
            'border-l-[8px] border-r-[8px] border-t-[8px]',
          )}
        />
      )}
    </button>
  )
})

export default Step2FPS