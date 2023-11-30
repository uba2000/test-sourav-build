import BuildLayout from './components/BuildLayout'
import CardWithNotch from '../../../components/CardWithNotch/CardWithNotch'

import Button from '../../../components/Button/Button'
import { useNavigate } from 'react-router-dom'
import RouteNames from '../../../lib/utils/routenames'
import ImageFigure from '../../../components/ImageFigure'
import RightArrow from '../../../assets/right-arrow.svg'
import useBuildPCStages from '../../../lib/hooks/useBuildPCStages'

function StartFromScratch() {
  const navigate = useNavigate()

  const { currentBuildStage, currentBuildStageIndex } = useBuildPCStages();

  function goToChooseComponent() {
    navigate(`${RouteNames.buildChooseComponent}/${currentBuildStage.slug}`)
  }

  return (
    <BuildLayout layout_r_title='Start from scratch'>
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

      {currentBuildStageIndex > 0 && (
        <CardWithNotch notchHeight='small'>
          <div className="py-1 px-6 flex gap-2">
            <div className='flex flex-col gap-y-2'>
              <p className='text-sm font-IntelOneBodyTextBold'>
                Next, choose a {currentBuildStage.short_name}.
              </p>
              <div className='pb-2'>
                <Button className='py-1 px-2' onClick={() => goToChooseComponent()}>
                  <div className="flex items-center gap-x-2">
                    <span className='text-black font-IntelOneBodyTextMedium text-sm leading-[13px]'>Select a {currentBuildStage.title}</span>
                    <ImageFigure icon={RightArrow} width={12} />
                  </div>
                </Button>
              </div>
            </div>
          </div>
        </CardWithNotch>
      )}
    </BuildLayout>
  )
}

export default StartFromScratch