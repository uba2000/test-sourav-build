import { Fragment, useEffect, useLayoutEffect, useMemo, useState } from 'react'
import BuildLayout from '../build-scratch/components/BuildLayout'
import BuildItem from '../build-scratch/MyBuild/components/BuildItem';
import useBuildPCContext from '../../../lib/hooks/contextHooks/useBuildPCContext';
import _ from 'lodash';
import SingleCompareComponents from '../build-scratch/CompareComponents/components/SingleCompareComponents';
import { IBuildStagesSlugs } from '../../../lib/types/context-types';
import useSingleEffectCall from '../../../lib/hooks/useSingleEffectCall';
import BuildLayoutChild from '../build-scratch/components/BuildLayoutChild';

function PreconfigedSystems() {
  const {
    currentBuild, predefinedBuilds, togglePreBuildToCurrentBuildForPreview, addToRetailerUsersCart,
    showCurrentModelSpecs, completePixelStreaming, emitStreamSingleUIInteraction,
    toggleCanViewSpecs, setCurrentModelOnStage, toggleViewingComponentModel, pixelStreamRef,
  } = useBuildPCContext();

  const [canPlayStream, setCanPlayStream] = useState(false)

  useLayoutEffect(() => {
    togglePreBuildToCurrentBuildForPreview('add')
  }, [])

  useSingleEffectCall(() => {
    if (pixelStreamRef.current) {
      pixelStreamRef.current.addEventListener('webRtcConnected', () => {
        console.log('webRtcConnected');
        setCanPlayStream(true);
      })

      pixelStreamRef.current.addEventListener('playStream', () => {
        console.log('handleStreamPlaying(true)');
        console.log('play stream');
        setCanPlayStream(true);
      })
    }
  })

  useEffect(() => {
    if (currentBuild.length > 0 && canPlayStream) {
      console.log('##########in - canPlayStream: ', canPlayStream);

      setTimeout(() => {
        completePixelStreaming();
      }, 1000);
    }
  }, [currentBuild, canPlayStream])

  const componentItems = useMemo(() => currentBuild, [currentBuild])
  const [buildPrice, setBuildPrice] = useState<string>('')
  const [selectedItemID, setSelectedItemID] = useState<string | null>(null)
  const [_category_slug, setCategorySlug] = useState<IBuildStagesSlugs>();

  useEffect(() => {
    if (componentItems) {
      setBuildPrice(
        `${componentItems.reduce((sum, product) => sum + (product?.price || 0), 0)}`
      );
    }
  }, [componentItems])

  function handleAddAllToCart() {
    addToRetailerUsersCart({ state: 'single' })
  }

  function handleBuildItemClick(_id: string) {
    const _item = currentBuild.find((d) => d._id === _id);
    toggleCanViewSpecs(true);
    setCategorySlug(_item?.category_slug);
    setCurrentModelOnStage(_item?.image as string);
    emitStreamSingleUIInteraction({ component_id: _id })
    if ((selectedItemID === _id || !selectedItemID) && selectedItemID !== _id) {
      toggleViewingComponentModel();
    }
    setSelectedItemID(_id)
  }

  function scrollBodyToTop() {
    const targetDiv = document.querySelector('#app_container');

    if (targetDiv) {
      targetDiv.scrollTop = 0;
    }
  }

  useEffect(() => {
    scrollBodyToTop();
  }, [])

  return (
    <BuildLayoutChild
      showPriceSection
      // stagesStatus='complete'
      layout_r_title={!showCurrentModelSpecs ? `${_.capitalize(predefinedBuilds?.build_segment)} build` : ''}
      totalPrice={buildPrice}
    // buildModel={enthusiast.buildModel}
    >
      {!showCurrentModelSpecs && (
        <>
          <BuildLayout.HeaderTitle
            subTitle={`Ready player! Based on your gaming preferences, you will need a high performance ${predefinedBuilds?.title}. Inspect your build details below:`}
          />
          <div className='flex flex-col gap-y-3'>
            {componentItems && componentItems.map((d) => (
              <Fragment key={d._id}>
                <BuildItem
                  data={d}
                  selected={d._id === selectedItemID}
                  addToCart={handleAddAllToCart}
                  onClick={(_id: string) => handleBuildItemClick(_id)}
                />
              </Fragment>
            ))}
          </div>
        </>
      )}

      {showCurrentModelSpecs && (
        <SingleCompareComponents
          category_slug={_category_slug as IBuildStagesSlugs}
          selectedItemID={selectedItemID}
          isInBuild
          inBuildPage
        // handleAddComponentToBuild={handleAddComponentToBuild}
        />
      )}
    </BuildLayoutChild>
  )
}

export default PreconfigedSystems