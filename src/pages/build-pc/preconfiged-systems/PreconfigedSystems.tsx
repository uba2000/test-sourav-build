import { Fragment, useEffect, useMemo, useState } from 'react'
import _ from 'lodash';
import BuildLayout from '../build-scratch/components/BuildLayout'
// import usePreBuiltBuilds from '../../../lib/hooks/contextHooks/usePreBuiltBuilds'
import BuildItem from '../build-scratch/MyBuild/components/BuildItem';
import useBuildPCContext from '../../../lib/hooks/contextHooks/useBuildPCContext';

function PreconfigedSystems() {
  // const { enthusiast } = usePreBuiltBuilds();
  const { predefinedBuilds } = useBuildPCContext();
  // console.log({predefinedBuilds, enthusiast});
  
  const componentItems = useMemo(() => predefinedBuilds?.items, [predefinedBuilds])
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
      stagesStatus='complete'
      layout_r_title='My Build'
      totalPrice={buildPrice}
      // buildModel={enthusiast.buildModel}
    >
      {/* <BuildLayout.HeaderTitle
        title={predefinedBuilds.title}
        subTitle={'[Short rationale for the selection of these components. ]'}
      /> */}

      <div className='flex flex-col gap-y-3'>
        {componentItems && componentItems.map((d) => (
          <Fragment key={_.uniqueId()}>
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