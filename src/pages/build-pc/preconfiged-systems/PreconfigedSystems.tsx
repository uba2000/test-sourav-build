import { Fragment, useEffect, useLayoutEffect, useMemo, useState } from 'react'
import BuildLayout from '../build-scratch/components/BuildLayout'
// import usePreBuiltBuilds from '../../../lib/hooks/contextHooks/usePreBuiltBuilds'
import BuildItem from '../build-scratch/MyBuild/components/BuildItem';
import useBuildPCContext from '../../../lib/hooks/contextHooks/useBuildPCContext';

function PreconfigedSystems() {
  // const { enthusiast } = usePreBuiltBuilds();
  const { currentBuild, togglePreBuildToCurrentBuildForPreview } = useBuildPCContext();
  // console.log({predefinedBuilds, enthusiast});

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

  return (
    <BuildLayout
      // stagesStatus='complete'
      layout_r_title='My Build'
      totalPrice={buildPrice}
      // buildModel={enthusiast.buildModel}
    >
      <div className='flex flex-col gap-y-3'>
        {componentItems && componentItems.map((d) => (
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

export default PreconfigedSystems