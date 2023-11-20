import _ from 'lodash';
import PolygonContainer from '../../../../components/PolygonContainer/PolygonContainer';
import BuildLayout from '../components/BuildLayout'
import ChooseComponentItem from './components/ChooseComponentItem';
import { Fragment, useMemo, useState } from 'react';
import Button from '../../../../components/Button/Button';

import { useMatches, useNavigate } from 'react-router-dom';
import useBuildPCStages, { type IBuildStages } from '../../../../lib/hooks/useBuildPCStages';
import clsx from 'clsx';
import RouteNames from '../../../../lib/utils/routenames';
import SingleCompareComponents from '../CompareComponents/components/SingleCompareComponents';
import ImageFigure from '../../../../components/ImageFigure';

import RightArrow from '../../../../assets/right-arrow-white.svg'

function ChooseComponents() {
  const matches = useMatches();
  const navigate = useNavigate();
  const { getStageData } = useBuildPCStages();

  const componentItems = useMemo(() => [
    {
      title: 'Intel® Core™ i9-14900KF processor',
      cores: '24',
      rating: 5,
      frequency: '6.0',
      powerConsumption: '125',
    },
    {
      title: 'Intel® Core™ i9-14900KF processor',
      cores: '24',
      rating: 5,
      frequency: '6.0',
      powerConsumption: '125',
    },
    {
      title: 'Intel® Core™ i9-14900KF processor',
      cores: '24',
      rating: 5,
      frequency: '6.0',
      powerConsumption: '125',
    },
  ], [])

  const stageDetails = useMemo<IBuildStages>(() => getStageData(matches[0].params?.category_slug as string), [])

  const [showSingleDetails, setShowSingleDetails] = useState(false);

  function handleToggleSingleDetails() {
    setShowSingleDetails(!showSingleDetails)
  }

  console.log('render');

  const [compareSelection, setCompareSelection] = useState<'product' | 'compare'>('product')

  function handleCompareSelection(selection: 'product' | 'compare') {
    setCompareSelection(selection)
  }

  function viewComparison() {
    navigate(`${RouteNames.buildCompareComponent}/processor?c1=${_.uniqueId()}&c2=${_.uniqueId()}`)
  }

  return (
    <BuildLayout>
      {!showSingleDetails && (
        <>
          <BuildLayout.HeaderTitle
            title={`Choose a ${stageDetails.title.toLowerCase()}`}
            subTitle={!stageDetails?.canCompare ? '[Short rationale for the selection of these components. ]' : ''}
          />

          {true && (
            <>
              <PolygonContainer>
                <div className="px-2 flex gap-2 items-center justify-center">
                  <span className="uppercase text-xs leading-[10px] whitespace-nowrap text-[rgba(255,255,255,0.75)]">Component specs</span>
                  <div className="border flex border-intel-cobalt-t1">
                    <button
                      type='button'
                      onClick={() => handleCompareSelection('product')}
                      className={clsx(
                        "flex items-center gap-x-[6px] py-1 px-2 text-xs font-IntelOneBodyTextMedium",
                        {"bg-intel-cobalt-t1": compareSelection === 'product'}
                      )}
                    >
                      Product
                      <ImageFigure icon={RightArrow} width={12} />
                    </button>
                    <button
                      type='button'
                      onClick={() => handleCompareSelection('compare')}
                      className={clsx(
                        "flex items-center gap-x-[6px] py-1 px-2 text-xs font-IntelOneBodyTextMedium",
                        {"bg-intel-cobalt-t1": compareSelection === 'compare'}
                      )}
                    >
                      Comparison
                      <ImageFigure icon={RightArrow} width={12} />
                    </button>
                  </div>
                </div>
              </PolygonContainer>
                
              <div className=''>
                <span className="uppercase text-xs leading-[10px] text-[rgba(255,255,255,0.75)]">Component specs</span>
              </div>

              <div className='flex pl-2 gap-x-3 mb-3 items-center'>
                <div className="flex-grow text-sm">
                  Select a single {stageDetails.title.toLowerCase()} to view specs
                </div>
                <div className="flex item-center min-w-[99px]">
                  <Button variant='cobalt' className='h-fit' onClick={() => viewComparison()}>
                    <div className="flex items-center gap-x-[6px] py-1 px-2 text-xs">
                      View specs
                      <ImageFigure icon={RightArrow} width={12} />
                    </div>
                  </Button>
                </div>
              </div>
            </>
          )}

          <div className='flex flex-col gap-y-3'>
            {componentItems.map((d) => (
              <Fragment key={_.uniqueId()}>
                <ChooseComponentItem data={d} onClick={() => handleToggleSingleDetails()} />
              </Fragment>
            ))}
          </div>
        </>
      )}

      {showSingleDetails && (
        <SingleCompareComponents handleToggleSingleDetails={() => handleToggleSingleDetails()} />
      )}
    </BuildLayout>
  )
}

export default ChooseComponents