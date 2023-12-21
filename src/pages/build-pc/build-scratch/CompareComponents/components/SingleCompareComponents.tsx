import ImageFigure from '../../../../../components/ImageFigure'
import CircleCloseIcon from '../../../../../assets/circle-close-icon.svg'
// import PolygonContainer from '../../../../../components/PolygonContainer/PolygonContainer'
import StarRatingComponent from '../../../../../components/StarRatingComponent/StarRatingComponent'
import CompatibilityBadge from '../../../../../components/CompatibilityBadge/CompatibilityBadge'
import Button from '../../../../../components/Button/Button'
import RightArrow from '../../../../../assets/right-arrow-white.svg'
import RightArrowBlack from '../../../../../assets/right-arrow.svg'
import useBuildPCContext from '../../../../../lib/hooks/contextHooks/useBuildPCContext'
import { Fragment, useMemo } from 'react'
import clsx from 'clsx'
import DoughnutChart from '../../../../../components/DoughnutChart/DoughnutChart'
import type { IDoughnutChartData } from '../../../../../components/DoughnutChart/types'
import useBuildPCStages from '../../../../../lib/hooks/useBuildPCStages'
import { IBuildStages, IBuildStagesSlugs } from '../../../../../lib/types/context-types'
import PolygonContainer from '../../../../../components/PolygonContainer/PolygonContainer'
import { getSpecDetailsImage } from '../../../../../lib/utils/util-asset-urls'
import Select from '../../../../../components/Select/Select'

// interface ISingleCompareComponents {
//   handleToggleSingleDetails: (_id: string) => void
// }

interface ISingleCompareComponents {
  handleAddComponentToBuild: (_id: string) => void;
  selectedItemID: string | null;
  category_slug: IBuildStagesSlugs; 
}

function SingleCompareComponents({selectedItemID, handleAddComponentToBuild, category_slug}: ISingleCompareComponents) {
  const { toggleShowSpecs, preferences, preferenceResolutions, allGamesMinMaxFPS, cleanGameInfoArray, predefinedBuilds } = useBuildPCContext()
  const { getStageData } = useBuildPCStages();
  console.log({preferences});
  
  const stageDetails = useMemo<IBuildStages>(() => getStageData(category_slug as string), [category_slug, getStageData])
  const componentItem = useMemo(() => stageDetails.items.find((d) => d._id === selectedItemID), [selectedItemID, stageDetails.items])

  const chartData = useMemo<IDoughnutChartData[]>(() => [
    {
      name: '',
      color: '#00FFFC',
      percentage: 45,
      value: ''
    },
    {
      name: '',
      color: '#00FFFC',
      percentage: 15,
      value: ''
    },
    {
      name: '',
      color: '#00FFFC',
      percentage: 15,
      value: ''
    },
    {
      name: '',
      color: '#0040FF',
      percentage: 5,
      value: ''
    },
    {
      name: '',
      color: '#0040FF',
      percentage: 5,
      value: ''
    },
    {
      name: '',
      color: '#0040FF',
      percentage: 5,
      value: ''
    },
    {
      name: '',
      color: '#0040FF',
      percentage: 5,
      value: ''
    },
    {
      name: '',
      color: '#0040FF',
      percentage: 5,
      value: ''
    },
  ], [])

  function addToBuild() {
    handleAddComponentToBuild(selectedItemID as string)
  }

  const currentGameTitle = useMemo(() => { 
    return cleanGameInfoArray.find((d) => d.data !== null)?.title || cleanGameInfoArray[0].title
  }, [cleanGameInfoArray])

  const percentageFPS = useMemo(() => {
    const _game_fps = cleanGameInfoArray.find((d) => d.title === currentGameTitle)
    const _game_max_fps = allGamesMinMaxFPS.max[currentGameTitle]
    return {
      fpsPercentage: !_game_fps
      ? 0
        : (parseInt(_game_fps.data?.fps || '0', 10) / _game_max_fps) * 100,
      fps: _game_fps?.data?.fps || 0
    }
  }, [cleanGameInfoArray, allGamesMinMaxFPS, currentGameTitle])

  const currentCPUGPUTitle = useMemo(() => { 
    return category_slug === 'processor'
      ? predefinedBuilds.items.find((d) => d.category_slug === 'graphics-card')?.title
      : predefinedBuilds.items.find((d) => d.category_slug === 'processor')?.title
  }, [predefinedBuilds, category_slug])

  console.log({componentItem});
  

  return (
    <div className='flex flex-col gap-y-3 min-h-full animate-fadeIn'>
      <div className="flex justify-end">
        <button type='button' className="cursor-pointer" onClick={() => toggleShowSpecs()}>
          <ImageFigure icon={CircleCloseIcon} width={16} />
        </button>
      </div>

      {(category_slug === 'processor' || category_slug === 'graphics-card')
        ? (
          <>
            <div className="flex justify-center">
              <div className='hidden md:block'>
                <ImageFigure icon={componentItem?.image || ''} width={205} />
              </div>
              <div className='block md:hidden'>
                <ImageFigure icon={componentItem?.image || ''} width={190} />
              </div>
            </div>

            <PolygonContainer btr={false} btl={false} bbr={false}>
              <div className="py-3 px-[18px] flex flex-col items-center text-center gap-y-3">
                <h1 className="text-M-h1 max-w-[257px] font-IntelOneDisplayBold line-clamp-3">
                  {componentItem?.title}
                </h1>

                <div className="flex justify-center gap-x-6">
                  <CompatibilityBadge />
                  <div className="flex gap-1 items-center">
                    <StarRatingComponent size={8} />
                    <span className="text-xs leading-[10px]">#### Reviews</span>
                  </div>
                </div>

                <div className="flex gap-x-3 items-center">
                  <span className="font-IntelOneBodyTextMedium text-xs">${componentItem?.price}</span>
                  <Button variant='gaming-cobalt' onClick={() => addToBuild()}>
                    <div className="flex items-center gap-x-[6px] py-1 px-2 text-xs">
                      Add to Build
                      <ImageFigure icon={RightArrow} width={12} />
                    </div>
                  </Button>
                </div>
              </div>
            </PolygonContainer>

            <div>
              {componentItem && (
                <img src={getSpecDetailsImage(componentItem._id, componentItem?.original_slug as string, 'desktop')} className="w-full h-full object-cover object-top" alt="" />
              )}
            </div>

            <div className="border border-[rgba(255,255,255,0.5)] p-4 w-full flex flex-col gap-y-[11px]">
              <div className=''>
                <h2 className="text-[18px] leading-[18px] font-IntelOneBodyTextBold">FPS Results</h2>
              </div>

              <div className="flex items-center gap-4">
                <div className="bg-white-20 h-[6px] w-full">
                  <div
                    style={{width: `${percentageFPS.fpsPercentage}%`}}
                    className={clsx(
                      'bg-gaming-blue h-full',
                    )}
                  />
                </div>
                <div className="min-w-[86px] text-right text-lg font-IntelOneBodyTextBold">
                  {percentageFPS.fps || 0} FPS
                </div>
              </div>

              <div className='flex gap-1'>
                <div className="min-w-[150px] text-sm">Gaming at </div>
                <div className='hidden'>
                  <div className="flex-grow flex gap-[6px] items-center py-[6px] px-3 bg-gaming-blue">
                    <span className='text-xs line-clamp-1 font-IntelOneBodyTextMedium text-gaming-navy'>{preferences?.gaming_resolution?.res || ''}</span>
                    <ImageFigure icon={RightArrowBlack} width={12} />
                  </div>
                </div>
                <div className='flex-1'>
                  <Select
                    options={preferenceResolutions.map((d) => ({
                      label: `${d.title.toUpperCase()} - ${d.res.toLowerCase()}`,
                      value: d.res,
                    }))}
                    initialValue=''
                  />
                </div>
              </div>

              <div className='flex gap-1'>
                <div className="min-w-[150px] text-sm">Paired with </div>
                <div className='hidden'>
                  <div className="flex-grow flex gap-[6px] items-center py-[6px] px-3 bg-gaming-blue">
                    <span className='text-xs line-clamp-1 font-IntelOneBodyTextMedium text-gaming-navy'>{currentCPUGPUTitle || ''}</span>
                    <ImageFigure icon={RightArrowBlack} width={12} />
                  </div>
                </div>
                <div className='flex-1'>
                  <Select options={[]} initialValue='' />
                </div>
              </div>

              <div className='flex gap-1'>
                <div className="min-w-[150px] text-sm">While playing </div>
                <div className='hidden'>
                  <div className="flex-grow flex gap-[6px] items-center py-[6px] px-3 bg-gaming-blue">
                    <span className='text-xs line-clamp-1 font-IntelOneBodyTextMedium text-gaming-navy'>{currentGameTitle || ''}</span>
                    <ImageFigure icon={RightArrowBlack} width={12} />
                  </div>
                </div>
                <div className='flex-1'>
                  <Select
                    options={preferences.game_type_title.map(d => ({
                      label: d,
                      value: d
                    }))}
                    initialValue=''
                  />
                </div>
              </div>
            </div>
          </>
        )
        : (
          <>
            <div className='my-2 w-full border-b border-b-white-75'>
              {/* <PolygonContainer> */}
              <div className="py-3 flex flex-col items-center text-center gap-y-3">
                <h1 className="text-M-h1 max-w-[257px] font-IntelOneDisplayBold line-clamp-3">
                  {componentItem?.title}
                </h1>

                <div className="flex justify-center gap-x-6">
                  <CompatibilityBadge />
                  <div className="flex gap-1 items-center">
                    <StarRatingComponent size={8} />
                    <span className="text-xs leading-[10px]">#### Reviews</span>
                  </div>
                </div>

                <div className="flex gap-x-3 items-center">
                  <span className="font-IntelOneBodyTextMedium text-xs">${componentItem?.price}</span>
                  <Button variant='gaming-cobalt' onClick={() => addToBuild()}>
                    <div className="flex items-center gap-x-[6px] py-1 px-2 text-xs">
                      Add to build
                      <ImageFigure icon={RightArrow} width={12} />
                    </div>
                  </Button>
                </div>

              </div>
              {/* </PolygonContainer> */}
            </div>
            <div>
              {componentItem && (
                <img src={getSpecDetailsImage(componentItem._id, componentItem?.original_slug as string, 'desktop')} className="w-full h-full object-cover object-top" alt="" />
              )}
            </div>
            <div className="hidden">
              <div className='my-2 w-full border-b border-b-white-75'>
                {/* <PolygonContainer> */}
                <div className="py-3 flex flex-col items-center text-center gap-y-3">
                  <h1 className="text-M-h1 max-w-[257px] font-IntelOneDisplayBold line-clamp-3">
                    {componentItem?.title}
                  </h1>

                  <div className="flex justify-center gap-x-6">
                    <CompatibilityBadge />
                    <div className="flex gap-1 items-center">
                      <StarRatingComponent size={8} />
                      <span className="text-xs leading-[10px]">#### Reviews</span>
                    </div>
                  </div>

                  <div className="flex gap-x-3 items-center">
                    <span className="font-IntelOneBodyTextMedium text-xs">${componentItem?.price}</span>
                    <Button variant='gaming-cobalt' onClick={() => addToBuild()}>
                      <div className="flex items-center gap-x-[6px] py-1 px-2 text-xs">
                        Add to build
                        <ImageFigure icon={RightArrow} width={12} />
                      </div>
                    </Button>
                  </div>

                </div>
                {/* </PolygonContainer> */}
              </div>

              {/* hidden */}
              <div className="max-w-[199px] min-h-[100px] mx-auto hidden items-center">
                <span className='text-xs font-IntelOneBodyTextMedium max-w-[83px]'>Up to 6.0 GHz Max turbo</span>
                {/* Circle chat here */}
              </div>
              {/* hidden */}

              <div className="pt-3 px-6">
                <div className="border-b border-b-white-75 pb-[22px]">
                  <div className='flex flex-col gap-y-4'>
                    <div className="flex justify-center gap-x-4">
                      <span className='text-xs font-IntelOneBodyTextMedium'>FPO</span>
                      <span className='text-xs'>specs</span>
                    </div>

                    <div className="flex gap-x-1 items-center justify-center">
                      <div className='flex items-center gap-x-4'>
                        <span className='font-IntelOneBodyTextMedium text-xs uppercase tracking-widest'>Category A</span>
                        <div className='min-w-[100px] min-h-[100px]'>
                          <DoughnutChart chartData={chartData} size={100} />
                        </div>
                      </div>
                      <div className='text-xs'>A units</div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 pb-[22px] border-b border-b-white-75 flex flex-col gap-y-2">
                  <div className="flex gap-x-2 items-end justify-center">
                    <span className='text-M-h1 font-IntelOneDisplayBold'>BBBB</span>
                    <span className='text-sm font-IntelOneBodyTextMedium'>B units</span>
                  </div>
                  <div className="py-1 px-[9px] flex gap-[3px]">
                    {Array.from({ length: 24 }, (_, index) => index + 1).map((__, index) => {
                      const _percent = 1;
                      const _index = Math.ceil(_percent * 24)
                      return (
                        <Fragment key={index}>
                          <div
                            className={clsx(
                              "w-2 min-w-[8px] h-[6px]",
                              {"bg-gaming-blue": index <= _index},
                              {"bg-gaming-cobalt": index > _index}
                            )}
                          />
                        </Fragment>
                      )
                    })}
                  </div>
                </div>

                <div className="pt-4 grid grid-cols-2 w-full">
                  <div className="pr-1 border-r flex flex-col items-center border-r-white-50">
                    <span className='text-M-h1 font-IntelOneDisplayBold'>CCCC</span>
                    <span className='text-sm font-IntelOneBodyTextMedium'>C units</span>
                  </div>
                  <div className="pl-1 flex flex-col items-center">
                    <span className='text-M-h1 font-IntelOneDisplayBold'>DDDD</span>
                    <span className='text-sm font-IntelOneBodyTextMedium'>D units</span>
                  </div>
                </div>
              </div>

              {/* hidden */}
              <div className="hidden gap-y-4 max-w-[168px] mx-auto flex-wrap justify-center">
                <div className="grid grid-cols-[80px_80px] gap-2 w-full">
                  <div className="bg-[rgba(255,255,255,0.2)] py-3 flex flex-col items-center">
                    <span className='text-M-h1 font-IntelOneBodyTextBold'>20</span>
                    <span className='text-xs font-IntelOneBodyTextMedium leading-[12px]'>Cores</span>
                  </div>
                  <div className="flex flex-col gap-y-2">
                    <div className="bg-[rgba(255,255,255,0.2)] py-1 flex flex-col items-center">
                      <span className='text-xs font-IntelOneBodyTextMedium leading-[14px]'>8</span>
                      <span className='text-xs font-IntelOneBodyTextMedium leading-[12px]'>P-cores</span>
                    </div>
                    <div className="bg-[rgba(255,255,255,0.2)] py-1 flex flex-col items-center">
                      <span className='text-xs font-IntelOneBodyTextMedium leading-[14px]'>12</span>
                      <span className='text-xs font-IntelOneBodyTextMedium leading-[12px]'>E-cores</span>
                    </div>
                  </div>
                </div>
                <div className="bg-[rgba(255,255,255,0.2)] py-3 flex flex-col items-center min-w-[80px]">
                  <span className='text-M-h1 font-IntelOneBodyTextBold'>125W</span>
                  <span className='text-xs font-IntelOneBodyTextMedium leading-[12px]'>TDP</span>
                </div>
              </div>
              {/* hidden */}

              <div className="border border-[rgba(255,255,255,0.5)] p-4 w-full">
                <div className='mb-2'>
                  <h2 className="text-M-h2 font-IntelOneBodyTextBold mb-2">FPS</h2>
                  <p className="text-xs">Gaming at QHD 1440 resolution. When paired with a XXXXXX GPU.  </p>
                </div>

                <div className="flex flex-col gap-y-2">
                  <div className="flex gap-4">
                    <div className='text-xs flex-grow min-w-[120px]'>Valorant</div>
                    <div className='flex items-center w-[100px]'>
                      <div className='bg-[rgba(255,255,255,0.2)] h-[6px] w-full'>
                        <div className="max-w-full h-full bg-gaming-blue" style={{width: '60%'}} />
                      </div>
                    </div>
                    <div className='min-w-[32px] flex-grow font-IntelOneBodyTextMedium'>245</div>
                  </div>

                  <div className="flex gap-4">
                    <div className='text-xs flex-grow min-w-[120px]'>Ghostrunner 2</div>
                    <div className='flex items-center w-[100px]'>
                      <div className='bg-[rgba(255,255,255,0.2)] h-[6px] w-full'>
                        <div className="max-w-full h-full bg-gaming-blue" style={{width: '60%'}} />
                      </div>
                    </div>
                    <div className='min-w-[32px] flex-grow font-IntelOneBodyTextMedium'>168</div>
                  </div>

                  <div className="flex gap-4">
                    <div className='text-xs flex-grow min-w-[120px]'>League of Legends</div>
                    <div className='flex items-center w-[100px]'>
                      <div className='bg-[rgba(255,255,255,0.2)] h-[6px] w-full'>
                        <div className="max-w-full h-full bg-gaming-blue" style={{width: '60%'}} />
                      </div>
                    </div>
                    <div className='min-w-[32px] flex-grow font-IntelOneBodyTextMedium'>322</div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )
      }
    </div>
  )
}

export default SingleCompareComponents