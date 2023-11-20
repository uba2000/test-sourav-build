import { Fragment, useState } from 'react'
import PreferenceLayout from '../PreferenceLayout/PreferenceLayout'
import BuildGamePreferences from '../../BuildGamePreferences'
import clsx from 'clsx'

function Step1GameType() {
  const [selectedGame, setSelectedGame] = useState<string | null>(null)

  function selectGame(_id: string) {
    if (selectedGame === _id) {
      setSelectedGame(null);
      return;
    }

    setSelectedGame(_id)
  }

  return (
    <>
      <PreferenceLayout.HeadingTitle
        text='What games do you want to play?'
        subText='Select all that apply:'
      />

      <div className="grid md:grid-cols-[repeat(auto-fill,114px)] grid-cols-[repeat(auto-fill,100px)] place-content-center gap-4 grid-row-[repeat(auto-fill,minmax(134px,1fr))]">
        {BuildGamePreferences.map((d) => (
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
                  { 'bg-gaming-cobalt': selectedGame === d._id },
                  { 'bg-[#322E41]': selectedGame !== d._id },
                )}
              >
                <span className="font-medium text-xs leading-[14px]">{d.title}</span>
              </div>
            </button>
          </Fragment>
        ))}
      </div>
    </>
  )
}

export default Step1GameType