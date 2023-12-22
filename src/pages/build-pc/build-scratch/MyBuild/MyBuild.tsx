import { useMatches, useNavigate } from 'react-router-dom';
import useBuildPCStages from '../../../../lib/hooks/useBuildPCStages';
import RouteNames from '../../../../lib/utils/routenames';
import BuildLayout from '../components/BuildLayout';
import CardWithNotch from '../../../../components/CardWithNotch/CardWithNotch';
import Button from '../../../../components/Button/Button';
import ImageFigure from '../../../../components/ImageFigure';
import RightArrow from '../../../../assets/right-arrow.svg'
import BuildItem from './components/BuildItem';
import useBuildPCContext from '../../../../lib/hooks/contextHooks/useBuildPCContext';
import { Fragment, useMemo, useState } from 'react';
import SingleCompareComponents from '../CompareComponents/components/SingleCompareComponents';
import { IBuildStagesSlugs } from '../../../../lib/types/context-types';

function MyBuild() {
  const matches = useMatches();
  const navigate = useNavigate()

  const {
    buildStages, currentBuild, addToRetailerUsersCart, showCurrentModelSpecs,
    toggleCanViewSpecs, setCurrentModelOnStage, toggleViewingComponentModel,
  } = useBuildPCContext()
  const { currentBuildStageIndex, nextToBuildIndex } = useBuildPCStages();

  const _category_slug = useMemo<IBuildStagesSlugs>(() => matches[0].params?.category_slug as IBuildStagesSlugs, [matches])
  const _currentBuildStage = useMemo(() => buildStages[nextToBuildIndex], [buildStages, nextToBuildIndex])  

  const [selectedItemID, setSelectedItemID] = useState<string | null>(null)

  function goToChooseComponent() {
    navigate(`${RouteNames.buildChooseComponent}/${_currentBuildStage.slug}`)
  }

  function handleAddAllToCart() {
    addToRetailerUsersCart({ state: 'single' })
  }

  function handleBuildItemClick(_id: string) {
    const _item = currentBuild.find((d) => d._id === _id);
    toggleCanViewSpecs(true);
    setCurrentModelOnStage(_item?.image as string);
    if ((selectedItemID === _id || !selectedItemID) && selectedItemID !== _id) {
      toggleViewingComponentModel();
    }
    setSelectedItemID(_id)
  }

  return (
    <BuildLayout
      layout_r_title={`${!showCurrentModelSpecs ? 'My Build' : ''}`}
      showPriceSection={currentBuildStageIndex > 0}
    >
      {!showCurrentModelSpecs && (
        <div className='flex flex-col gap-y-[10px]'>
          {(currentBuildStageIndex === 0 && currentBuild.length === 0) && (
            <CardWithNotch notchHeight='small'>
              <div className="py-1 px-6 flex gap-2">
                <div className='flex flex-col gap-y-2'>
                  <p className='text-sm'>
                    Choose a processor, GPU and motherboard to get started.  Then fill out the remaining components for a complete system. 
                  </p>
                  <div className='pb-2'>
                    <Button className='p-2' onClick={() => goToChooseComponent()}>
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

          {((currentBuildStageIndex > 0 && currentBuildStageIndex < buildStages.length)
          || (currentBuild.length !== 0 && currentBuildStageIndex > 0)) && (
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
                selected={d._id === selectedItemID}
                onClick={(_id: string) => handleBuildItemClick(_id)}
                addToCart={handleAddAllToCart}
              />
            </Fragment>
          ))}
        </div>
      )}

      {showCurrentModelSpecs && (
        <SingleCompareComponents
          category_slug={_category_slug}
          selectedItemID={selectedItemID}
          isInBuild
          inBuildPage
          // handleAddComponentToBuild={handleAddComponentToBuild}
        />
      )}
    </BuildLayout>
  )
}

export default MyBuild