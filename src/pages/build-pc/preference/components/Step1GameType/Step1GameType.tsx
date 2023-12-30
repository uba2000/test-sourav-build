import { Fragment, useState } from 'react'
import PreferenceLayout from '../PreferenceLayout/PreferenceLayout'
import clsx from 'clsx'
import useBuildPCContext from '../../../../../lib/hooks/contextHooks/useBuildPCContext'
import { noPreferenceId, noPreferenceName } from '../../BuildGamePreferences'
import { getGameTitlesImage } from '../../../../../lib/utils/util-asset-urls'

function Step1GameType() {
  const { preferenceGameTypes, setGamingPreference, preferences } = useBuildPCContext()
  const [selectedGame, setSelectedGame] = useState<string[]>(preferences.game_type_title)

  function selectGame(_title: string) {
    let _items = [...selectedGame];

    // check if no preferences is selected
    const noPreferencExist = _items.find((d) => d === noPreferenceName);
    if (noPreferencExist && _title !== noPreferenceName) {
      _items = _items.filter((d) => d !== noPreferenceName);
      const _selected_item = preferenceGameTypes.find((d) => d.title === _title)?.title;
      if (_selected_item) {
        _items.push(_selected_item);
      }
      setSelectedGame(_items)
      setGamingPreference('game_type_title', _items)
      return;
    }

    if (_title === noPreferenceName) {
      // remove all items and add only preference
      _items = [];
    }

    const exists = _items.find((d) => d === _title);

    if (exists) {
      // remove it
      _items = _items.filter((d) => d !== _title);
    } else {
      // add it
      const _selected_item = preferenceGameTypes.find((d) => d.title === _title)?.title;
      if (_selected_item) {
        _items.push(_selected_item);
      }
    }
    setSelectedGame(_items)
    setGamingPreference('game_type_title', _items)
  }

  return (
    <div className='animate-fadeInUp'>
      <PreferenceLayout.HeadingTitle
        text='What games do you want to play?'
        subText='Select all that apply:'
      />

      <div className="grid md:grid-cols-[repeat(auto-fill,114px)] grid-cols-[repeat(auto-fill,100px)] place-content-center gap-4">
        {preferenceGameTypes.map((d) => {
          const _is_selected = selectedGame.find((data) => data === d.title);

          return (
            <Fragment key={d._id}>
              <button type='button' onClick={() => selectGame(d.title)} className="group cursor-pointer h-[160px]">
                {d?._id !== noPreferenceId && (
                <div className={clsx("h-[114px]")}>
                  <img src={getGameTitlesImage(d._id)} className="w-full h-full object-cover object-top" alt="" />
                </div>
                )}
                <div
                  className={clsx(
                    "flex items-center justify-center px-[10px] min-h-[46px] text-center with-ease",
                    { 'h-full': d?._id === noPreferenceId },
                    { 'bg-gaming-cobalt': _is_selected },
                    { 'bg-[#322E41] group-hover:bg-intel-20-cobalt': !_is_selected },
                  )}
                >
                  <span className="font-medium text-xs leading-[14px]">{d.title}</span>
                </div>
              </button>
            </Fragment>
          )
        })}
      </div>
    </div>
  )
}

export default Step1GameType