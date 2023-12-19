import PreferenceLayout from '../PreferenceLayout/PreferenceLayout'

import FullResImage from '../../../../../assets/res/full-res-image.svg'

import { Fragment, useMemo, useState } from 'react'
import _ from 'lodash'
import clsx from 'clsx'
import useBuildPCContext from '../../../../../lib/hooks/contextHooks/useBuildPCContext'
import { PreferenceResolutionsTitleType } from '../../../../../lib/types/context-types'

interface IStep3ResolutionProps {
  availableRes: {
    [k in PreferenceResolutionsTitleType]: string[];
  }
}

function Step3Resolution({availableRes}: IStep3ResolutionProps) {
  const { setGamingPreference, preferenceResolutions, preferences } = useBuildPCContext()
  const resolutions = useMemo(() => preferenceResolutions, [preferenceResolutions])

  const [selectedRESIndex, setSelectedRESIndex] = useState<string | null>(preferences.gaming_resolution?.title || null);
  const [selectedRESImage, setSelectedRESImage] = useState<string | null>(preferences.gaming_resolution?.fullImage || null);

  function selectRESIndex(index: number) {
    setSelectedRESIndex(resolutions[index].title)
    setSelectedRESImage(resolutions[index].fullImage)
    setGamingPreference('gaming_resolution', resolutions[index])
  }

  return (
    <div className='animate-fadeIn'>
      <PreferenceLayout.HeadingTitle
        text='And what resolution would you like for gaming?'
        subText='Select one:'
      />

      <div className='flex max-w-[930px] md:flex-nowrap flex-wrap'>
        <div className='relative max-w-full min-h-[187px] md:min-w-[550px] min-w-full md:-mr-8'>
          <img src={FullResImage} alt="" className='object-contain w-full h-full' />
        </div>

        <div className="relative z-10 w-full max-w-[257px] mx-auto md:mx-[unset] md:max-w-none flex-auto md:-mt-[83px] -mt-[37px]">
          <div className="w-full h-full grid grid-cols-3 gap-x-[6px]">
            {resolutions.map((d, index) => (
              <Fragment key={_.uniqueId()}>
                <div className='relative flex flex-col md:gap-y-6 gap-y-3 md:min-h-[480px] min-h-[272px] group'>
                  <div
                    onClick={() => availableRes[d.title].length !== 0 && selectRESIndex(index)}
                    className={clsx(
                      "flex-1",
                      {"cursor-pointer": availableRes[d.title].length !== 0},
                      {"opacity-20 bg-[rgba(0,0,0,0.2)]": availableRes[d.title].length === 0},
                    )}
                  >
                    <img
                      src={d.image}
                      alt=""
                      className={clsx(
                        'h-full object-cover',
                        {
                          "object-left": index === 0,
                          "object-center": index === 1,
                          "object-right": index === 2,
                        }
                      )}
                    />
                  </div>
                  <button
                    type='button'
                    disabled={availableRes[d.title].length === 0}
                    onClick={() => selectRESIndex(index)}
                    className={clsx(
                      'md:h-[60px] relative p-2 md:px-6 px-3 with-ease',
                      {"bg-gaming-cobalt": selectedRESIndex === d.title && availableRes[d.title].length !== 0},
                      { "bg-[rgba(255,255,255,0.20)] group-hover:bg-intel-20-cobalt": selectedRESIndex !== d.title && availableRes[d.title].length !== 0 },
                      {"opacity-20 bg-[rgba(255,255,255,0.20)]": availableRes[d.title].length === 0},
                    )}
                  >
                    {selectedRESIndex === d.title && (
                      <div
                        className={clsx(
                          'absolute md:-top-[12px] -top-[8px] left-1/2 -translate-x-1/2 w-0 h-0',
                          'border-b-gaming-cobalt border-l-transparent border-r-transparent',
                          'md:border-l-[12px] md:border-r-[12px] md:border-b-[12px]',
                          'border-l-[8px] border-r-[8px] border-b-[8px]',
                        )}
                      />
                    )}
                    <span className=''>
                      <span className='md:text-base text-center text-xs leading-[12px] font-IntelOneBodyTextMedium block uppercase'>{d.title}=</span>
                      <span className='md:text-base text-center text-xs leading-[12px] font-IntelOneBodyTextMedium block'>{d.res}</span>
                    </span>
                  </button>
                </div>
              </Fragment>
            ))}

            {selectedRESIndex && (
              <figure className='absolute z-10 left-0 top-0 w-full md:h-[calc(100%_-_83px)] h-[calc(100%_-_50px)]'>
                <img src={selectedRESImage || ''} className="w-full h-full" alt="figure" />
              </figure>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Step3Resolution