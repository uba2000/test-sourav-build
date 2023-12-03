import { useNavigate } from 'react-router-dom';
import useBuildPCStages from '../../../../lib/hooks/useBuildPCStages';
import RouteNames from '../../../../lib/utils/routenames';
import BuildLayout from '../components/BuildLayout';
import CardWithNotch from '../../../../components/CardWithNotch/CardWithNotch';
import Button from '../../../../components/Button/Button';
import ImageFigure from '../../../../components/ImageFigure';
import RightArrow from '../../../../assets/right-arrow.svg'
import BuildItem from './components/BuildItem';
import useBuildPCContext from '../../../../lib/hooks/contextHooks/useBuildPCContext';
import { Fragment, useMemo } from 'react';
// import { useMemo } from 'react';

function MyBuild() {
  const navigate = useNavigate()

  const { buildStages, currentBuild } = useBuildPCContext()
  const { currentBuildStageIndex, nextToBuildIndex } = useBuildPCStages();

  const _currentBuildStage = useMemo(() => buildStages[nextToBuildIndex], [buildStages, nextToBuildIndex])  

  function goToChooseComponent() {
    navigate(`${RouteNames.buildChooseComponent}/${_currentBuildStage.slug}`)
  }

  return (
    <BuildLayout layout_r_title='My Build' showPriceSection={currentBuildStageIndex > 0}>
      <div className='flex flex-col gap-y-[10px]'>
        {currentBuildStageIndex === 0 && (
          <CardWithNotch notchHeight='small'>
            <div className="py-1 px-6 flex gap-2">
              <div className='flex flex-col gap-y-2'>
                <p className='text-sm'>
                  Choose a processor, GPU and motherboard to get started.  Then fill out the remaining components for a complete system. 
                </p>
                <div className='pb-2'>
                  <Button className='py-1 px-2' onClick={() => goToChooseComponent()}>
                    <div className="flex items-center gap-x-2">
                      <span className='text-black font-IntelOneBodyTextMedium text-sm leading-[13px]'>Select a processor</span>
                      <ImageFigure icon={RightArrow} width={12} />
                    </div>
                  </Button>
                </div>
              </div>
            </div>
          </CardWithNotch>
        )}

        {(currentBuildStageIndex > 0 && currentBuildStageIndex < buildStages.length) && (
          <div className="flex justify-end items-center gap-x-2">
            <span className="text-xs font-IntelOneBodyTextMedium"> Next, select a</span>
            <Button onClick={() => goToChooseComponent()} className="min-w-fit py-2 px-3">
              <div className="flex gap-2 items-center">
                <span className="text-intel-e-gray-s2 text-xs font-IntelOneBodyTextMedium leading-[11px]">{_currentBuildStage?.title}</span>
                <ImageFigure icon={RightArrow} width={12} />
              </div>
            </Button>
          </div>
        )}

        {/* list of builds... */}
        {currentBuild.map((d) => (
          <Fragment key={d._id}>
            <BuildItem
              data={d}
            />
          </Fragment>
        ))}
      </div>

    </BuildLayout>
  )
}

export default MyBuild