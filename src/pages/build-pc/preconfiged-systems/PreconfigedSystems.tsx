import { Fragment, useEffect, useLayoutEffect, useMemo, useState } from 'react'
import BuildLayout from '../build-scratch/components/BuildLayout'
import BuildItem from '../build-scratch/MyBuild/components/BuildItem';
import useBuildPCContext from '../../../lib/hooks/contextHooks/useBuildPCContext';
import _ from 'lodash';

function PreconfigedSystems() {
  const { currentBuild, predefinedBuilds, togglePreBuildToCurrentBuildForPreview, addToRetailerUsersCart } = useBuildPCContext();

  useLayoutEffect(() => {
    togglePreBuildToCurrentBuildForPreview('add')
  }, [togglePreBuildToCurrentBuildForPreview])
  
  const componentItems = useMemo(() => currentBuild, [currentBuild])
  const [buildPrice, setBuildPrice] = useState<string>('')

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

  return (
    <BuildLayout
      showPriceSection
      // stagesStatus='complete'
      layout_r_title={`${_.capitalize(predefinedBuilds?.build_segment)} build`}
      totalPrice={buildPrice}
      // buildModel={enthusiast.buildModel}
    >
      <BuildLayout.HeaderTitle
        subTitle={`Ready player! Based on your gaming preferences, you will need a high performance ${predefinedBuilds?.title}. Inspect your build details below:`}
      />
      <div className='flex flex-col gap-y-3'>
        {componentItems && componentItems.map((d) => (
          <Fragment key={d._id}>
            <BuildItem
              data={d}
              addToCart={handleAddAllToCart}
            />
          </Fragment>
        ))}
      </div>
    </BuildLayout>
  )
}

export default PreconfigedSystems