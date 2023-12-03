import PolygonContainer from '../../../components/PolygonContainer/PolygonContainer';
import ImageFigure from '../../../components/ImageFigure';

import CardWithNotch from '../../../components/CardWithNotch/CardWithNotch';
import Button from '../../../components/Button/Button';
import BuildLayout from './components/BuildLayout';

import InfoPointer from '../../../assets/info-pointer.svg'
import RightArrow from '../../../assets/right-arrow.svg'
import { useNavigate } from 'react-router-dom';
import RouteNames from '../../../lib/utils/routenames';
import useBuildPCContext from '../../../lib/hooks/contextHooks/useBuildPCContext';
import { Fragment } from 'react';

function BuildScratch() {
  const { preferences, togglePreBuildToCurrentBuildForPreview } = useBuildPCContext()
  const navigate = useNavigate()

  function startBuildFromScratch() {
    navigate(RouteNames.buildPCMyBuild)
    togglePreBuildToCurrentBuildForPreview('remove')
  }

  function choosePreconfiged() {
    navigate(RouteNames.preconfiguredSystemIndex)
  }

  return (
    <BuildLayout layout_r_title='Ready to start?'>
      {/* <BuildLayout.HeaderTitle title='Ready to build?' /> */}

      <div className="flex flex-col gap-y-4">
        <CardWithNotch notchHeight='small'>
          <div className="py-1 pl-4 pr-5 flex gap-2">
            <div>
              <ImageFigure icon={InfoPointer} />
            </div>
            <div className='flex flex-col gap-y-2'>
              <h3 className="text-M-h3 font-IntelOneBodyTextBold">Jumpstart your build</h3>
              <p className='text-sm'>
                Need help getting started? We’ll show you a complete set of components that you can edit as you like. 
              </p>
              <div className='pb-2'>
                <Button onClick={() => choosePreconfiged()} className='py-[6px] px-2'>
                  <div className="flex items-center gap-x-2">
                    <span className='text-black font-IntelOneBodyTextMedium text-sm leading-[13px]'>View your system</span>
                    <ImageFigure icon={RightArrow} width={12} />
                  </div>
                </Button>
              </div>
            </div>
          </div>
        </CardWithNotch>

        <CardWithNotch notchHeight='small'>
          <div className="py-1 pl-4 pr-5 flex gap-2">
            <div>
              <ImageFigure icon={InfoPointer} />
            </div>
            <div className='flex flex-col gap-y-2'>
              <h3 className="text-M-h3 font-IntelOneBodyTextMedium">Start from scratch</h3>
              <p className='text-sm'>
                Select a product category to review and choose components for your build. 
              </p>
              <div className='pb-2'>
                <Button onClick={() => startBuildFromScratch()} className='py-[6px] px-2'>
                  <div className="flex items-center gap-x-2">
                    <span className='text-black font-IntelOneBodyTextMedium text-sm leading-[13px]'>Choose your components</span>
                    <ImageFigure icon={RightArrow} width={12} />
                  </div>
                </Button>
              </div>
            </div>
          </div>
        </CardWithNotch>

        <div className="py-2 px-3 flex flex-col gap-y-2">
          <h3 className="font-IntelOneBodyTextBold">Build with confidence</h3>
          <p className='text-sm font-IntelOneBodyTextRegular'>
            These components have been selected to deliver FPS and resolution you want for your games. All components shown are compatible with each other. 
          </p>
        </div>

        <PolygonContainer>
          <div className="pl-5 pr-7 py-2">
            <div className="border-b-[rgba(255,255,255,0.2)] mb-[6px] border-b uppercase text-xs font-IntelOneBodyTextMedium pb-1 text-white-75">
              Preferences
            </div>

            <div className="grid grid-cols-2">
              <div className='flex flex-col gap-y-2'>
                <div>
                  <h6 className="uppercase text-xs font-IntelOneBodyTextMedium pb-1 text-white-75">
                    FPS
                  </h6>
                  <p className='text-sm'>
                    {preferences.gaming_fps?.fps}
                  </p>
                </div>

                <div>
                  <h6 className="uppercase text-xs font-IntelOneBodyTextMedium pb-1 text-white-75">
                    Resolution
                  </h6>
                  <p className='text-sm lowercase'>
                    {preferences.gaming_resolution?.res}
                  </p>
                </div>
              </div>
              <div className='flex flex-col gap-y-2'>
                <div>
                  <h6 className="uppercase text-xs font-IntelOneBodyTextMedium pb-1 text-white-75">
                    Games
                  </h6>
                  <p className='text-sm'>
                    {preferences.game_type_title.map((d, index) => (
                      <Fragment key={d}>
                        {d}
                        {index < (preferences.game_type_title.length - 1) && ', '}
                      </Fragment>
                    ))}
                    {/* League of Legends, Fortnight, Valorant */}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </PolygonContainer>
      </div>
    </BuildLayout>
  )
}

export default BuildScratch