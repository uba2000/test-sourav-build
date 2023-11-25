import _ from 'lodash';
import PolygonContainer from '../../../../components/PolygonContainer/PolygonContainer';
import BuildLayout from '../components/BuildLayout'
import ChooseComponentItem from './components/ChooseComponentItem';
import { Fragment, useMemo, useState } from 'react';
import Button from '../../../../components/Button/Button';

import { useMatches, useNavigate } from 'react-router-dom';
import useBuildPCStages from '../../../../lib/hooks/useBuildPCStages';
import clsx from 'clsx';
import RouteNames from '../../../../lib/utils/routenames';
import SingleCompareComponents from '../CompareComponents/components/SingleCompareComponents';
import ImageFigure from '../../../../components/ImageFigure';

import RightArrow from '../../../../assets/right-arrow-white.svg'
import { IBuildStages } from '../../../../lib/types/context-types';
import useBuildPCContext from '../../../../lib/hooks/contextHooks/useBuildPCContext';

function ChooseComponents() {
  const matches = useMatches();
  const navigate = useNavigate();
  const { getStageData, currentBuildStage } = useBuildPCStages();
  const { addComponentToBuild } = useBuildPCContext()

  const componentItems = useMemo(() => currentBuildStage.items, [currentBuildStage.items])
  const _category_slug = useMemo(() => matches[0].params?.category_slug as string, [matches])

  const stageDetails = useMemo<IBuildStages>(() => getStageData(_category_slug), [])

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [canCompare, setCanCompare] = useState(stageDetails?.canCompare)
  const [showSingleDetails, setShowSingleDetails] = useState(false);
  const [itemsToCompare, setItemsToCompare] = useState<string[]>([])

  function handleToggleSingleDetails(_id: string) {
    if (!canCompare) {
      setShowSingleDetails(!showSingleDetails)
      return;
    }

    // compare two items
    if (itemsToCompare.length < 2) {
      setItemsToCompare(prev => [...prev, _id])
    } else {
      let _itemsToCompare = [...itemsToCompare];
      _itemsToCompare.pop();
      _itemsToCompare = [..._itemsToCompare, _id];
      setItemsToCompare(_itemsToCompare)
    }
  }

  const [compareSelection, setCompareSelection] = useState<'product' | 'compare'>('product')

  function handleCompareSelection(selection: 'product' | 'compare') {
    setCompareSelection(selection)
  }

  function viewComparison() {
    navigate(`${RouteNames.buildCompareComponent}/processor?c1=${_.uniqueId()}&c2=${_.uniqueId()}`)
  }

  function handleAddComponentToBuild(_id: string) {
    addComponentToBuild({ category_slug: _category_slug, component_id: _id })
    navigate(`${RouteNames.buildPCMyBuild}`)
  }

  return (
    <BuildLayout>
      {!showSingleDetails && (
        <>
          <BuildLayout.HeaderTitle
            title={`Choose a ${stageDetails.title.toLowerCase()}`}
            subTitle={!canCompare ? '[Short rationale for the selection of these components. ]' : ''}
          />

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

          <div className='flex flex-col gap-y-3'>
            {componentItems && componentItems.map((d) => (
              <Fragment key={_.uniqueId()}>
                <ChooseComponentItem
                  selected={canCompare ? itemsToCompare.includes(d._id) : false}
                  data={d}
                  addToBuild={(id: string) => handleAddComponentToBuild(id)}
                  onClick={(_id: string) => handleToggleSingleDetails(_id)}
                />
              </Fragment>
            ))}
          </div>
        </>
      )}

      {showSingleDetails && (
        <SingleCompareComponents
          handleToggleSingleDetails={(_id: string) => handleToggleSingleDetails(_id)}
        />
      )}
    </BuildLayout>
  )
}

export default ChooseComponents