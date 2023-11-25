import { Fragment, useState } from 'react'
import PreferenceLayout from '../PreferenceLayout/PreferenceLayout'
import clsx from 'clsx'
import useBuildPCContext from '../../../../../lib/hooks/contextHooks/useBuildPCContext'
import { PreferenceGameType } from '../../../../../lib/types/context-types'

function Step1GameType() {
  const { preferenceGameTypes, setGamingPreference } = useBuildPCContext()
  const [selectedGame, setSelectedGame] = useState<PreferenceGameType[]>([])

  function selectGame(_id: string) {
    let _items = [...selectedGame];

    const exists = _items.find((d) => d._id === _id);

    if (exists) {
      // remove it
      _items = _items.filter((d) => d._id !== _id);
    } else {
      // add it
      const _selected_item = preferenceGameTypes.find((d) => d._id === _id);
      if (_selected_item) {
        _items.push({ ..._selected_item });
      }
    }
    setSelectedGame(_items)
    setGamingPreference('game_type_title', _items.map((d) => d.title))
  }

  return (
    <>
      <PreferenceLayout.HeadingTitle
        text='What games do you want to play?'
        subText='Select all that apply:'
      />

      <div className="grid md:grid-cols-[repeat(auto-fill,114px)] grid-cols-[repeat(auto-fill,100px)] place-content-center gap-4 grid-row-[repeat(auto-fill,minmax(134px,1fr))]">
        {preferenceGameTypes.map((d) => {
          const _is_selected = selectedGame.find((data) => data._id === d._id);

          return (
            <Fragment key={d._id}>
              <button type='button' onClick={() => selectGame(d._id)} className="cursor-pointer min-h-[116px]">
                {d?.image && (
                <div className={clsx("md:h-[114px] h-[76px]")}>
                  <img src={d?.image as string} className="w-full h-full object-cover object-top" alt="" />
                </div>
                )}
                <div
                  className={clsx(
                    "flex items-center justify-center px-[10px] min-h-[46px] text-center",
                    { 'h-full': !d.image },
                    { 'bg-gaming-cobalt': _is_selected },
                    { 'bg-[#322E41]': !_is_selected },
                  )}
                >
                  <span className="font-medium text-xs leading-[14px]">{d.title}</span>
                </div>
              </button>
            </Fragment>
          )
        })}
      </div>
    </>
  )
}

export default Step1GameType