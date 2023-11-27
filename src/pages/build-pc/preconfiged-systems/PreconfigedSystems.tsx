import { Fragment, useMemo } from 'react'
import _ from 'lodash';
import BuildLayout from '../build-scratch/components/BuildLayout'
import usePreBuiltBuilds from '../../../lib/hooks/contextHooks/usePreBuiltBuilds'
import BuildItem from '../build-scratch/MyBuild/components/BuildItem';

function PreconfigedSystems() {
  const { enthusiast } = usePreBuiltBuilds();
  const componentItems = useMemo(() => enthusiast.items, [enthusiast])

  return (
    <BuildLayout stagesStatus='complete' buildModel={enthusiast.buildModel}>
      <BuildLayout.HeaderTitle
        title={enthusiast.title}
        subTitle={'[Short rationale for the selection of these components. ]'}
      />

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