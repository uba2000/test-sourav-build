/* eslint-disable @typescript-eslint/no-explicit-any */
import { Fragment, useMemo } from 'react'
import PolygonContainer from '../../../../components/PolygonContainer/PolygonContainer'
import useBuildPCContext from '../../../../lib/hooks/contextHooks/useBuildPCContext';
import { getGameTitlesImage } from '../../../../lib/utils/util-asset-urls';
import clsx from 'clsx';

function PreferenceBox() {
  const { preferences, preferenceGameTypes, cleanGameInfoArray } = useBuildPCContext()
  
  const selectedGameTitles = useMemo(() => {
    const _preferences_set = new Set(preferences.game_type_title);
    let _selectedGameTitles: any = preferenceGameTypes.filter(element => _preferences_set.has(element.title));
    let _minimum_fps = '';

    _selectedGameTitles = _selectedGameTitles.map((_d: any) => {
      const _clean = cleanGameInfoArray.find((d) => d.title === _d.title)
      if ((!_minimum_fps && _clean?.data?.fps)) {
        _minimum_fps = _clean?.data?.fps
      } else if (_clean?.data?.fps && parseInt(_clean?.data?.fps) < parseInt(_minimum_fps)) {
        _minimum_fps = _clean?.data?.fps
      }

      return {
        ..._d,
        fps: _clean?.data?.fps || null,
      }
    })

    return _selectedGameTitles.map((d: any) => ({...d, fps: d.fps ? d.fps : _minimum_fps}));
  }, [preferences, preferenceGameTypes, cleanGameInfoArray])

  return (
    <PolygonContainer>
      <div className="p-2">
        <div className="flex justify-center items-center mb-2">
          <div className="py-2 px-[10px]">
            <span className='text-xs text-white font-IntelOneBodyTextMedium'>
              FPS Results
            </span>
          </div>
          <div className="py-2 px-[10px] border-l border-l-white-20">
            <span className='text-sm text-white font-IntelOneBodyTextMedium'>
              {preferences.gaming_resolution?.res}
            </span>
          </div>
        </div>

        <div className="grid md:grid-cols-[repeat(auto-fill,114px)] grid-cols-[repeat(auto-fill,100px)] place-content-center gap-4">
          {selectedGameTitles.map((d: any) => {
          return (
            <Fragment key={d._id}>
              <div className="group md:h-[160px] h-[122px]">
                <div className={clsx("md:h-[114px] h-[76px]")}>
                  <img src={getGameTitlesImage(d._id)} className="w-full h-full object-cover object-top" alt="" />
                </div>
                <div
                  className={clsx(
                    "flex items-center justify-center flex-col gap-y-2 px-[10px] min-h-[46px] pt-1 text-center with-ease"
                  )}
                >
                  <span className="font-medium text-[10px] leading-[10px] line-clamp-2">{d.title}</span>
                  <span className='text-sm leading-3 font-IntelOneBodyTextMedium'>{d.fps} FPS</span>
                </div>
              </div>
            </Fragment>
          )
        })}
        </div>
      </div>
    </PolygonContainer>
  )
}

export default PreferenceBox