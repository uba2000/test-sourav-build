import _ from 'lodash';
import PolygonContainer from '../../../../components/PolygonContainer/PolygonContainer';
import BuildLayout from '../components/BuildLayout'
import ChooseComponentItem from './components/ChooseComponentItem';
import { Fragment, useCallback, useEffect, useLayoutEffect, useMemo, useState } from 'react';
import Button from '../../../../components/Button/Button';

import { useMatches, useNavigate } from 'react-router-dom';
import useBuildPCStages from '../../../../lib/hooks/useBuildPCStages';
import clsx from 'clsx';
import RouteNames from '../../../../lib/utils/routenames';
import SingleCompareComponents from '../CompareComponents/components/SingleCompareComponents';
import ImageFigure from '../../../../components/ImageFigure';

import RightArrow from '../../../../assets/right-arrow-white.svg'
import { BuildFlowType, IBuildComponent, IBuildStages, IBuildStagesSlugs, ProductPredefinedPresets } from '../../../../lib/types/context-types';
import useBuildPCContext from '../../../../lib/hooks/contextHooks/useBuildPCContext';
import useBuildPlaceholders from '../../../../lib/hooks/useBuildPlaceholders';

function ChooseComponents() {
  const matches = useMatches();
  const navigate = useNavigate();
  const { getStageData } = useBuildPCStages();
  const {
    addComponentToBuild, currentBuild, buildFlowType, toggleCanViewSpecs,
    showCurrentModelSpecs, toggleShowSpecs, predefinedBuilds,
    setCurrentModelOnStage, toggleViewingComponentModel,
  } = useBuildPCContext()

  const { placeholderImages } = useBuildPlaceholders()

  const _category_slug = useMemo<IBuildStagesSlugs>(() => matches[0].params?.category_slug as IBuildStagesSlugs, [matches])
  const stageDetails = useMemo<IBuildStages>(() => getStageData(_category_slug as string), [_category_slug, getStageData])
  const componentItems = useMemo(() => stageDetails?.items || [], [stageDetails])
  const [_isInBuild, setIsInBuild] = useState<IBuildComponent | null>(null)

  const [selectedItemID, setSelectedItemID] = useState<string | null>(null)

  const onSelectComponentItem = useCallback((_id: string) => {
    const _item = componentItems.find((d) => d._id === _id);
    // console.log({ _item });
    toggleCanViewSpecs(true);
    
    // setCurrentModelOnStage(selectedItemID === _id ? '' : _item?.image as string);
    setCurrentModelOnStage(_item?.image as string);
    if ((selectedItemID === _id || !selectedItemID) && selectedItemID !== _id) {
      toggleViewingComponentModel();
    }
    // setSelectedItemID(selectedItemID === _id ? null : _id)
    setSelectedItemID(_id)
  }, [componentItems, selectedItemID, setCurrentModelOnStage, toggleViewingComponentModel])

  const handleSetCurrentPlaceholderImage = useCallback(() => {
    // console.log('herre');
    
    const _flow_type: BuildFlowType = buildFlowType;
    // then set the image for the current component selection
    let _stage_image = '';
    if (_flow_type === 'build_components') {
      _stage_image = placeholderImages[_flow_type][_category_slug]
    } else if (_flow_type === 'preconfiged_build') {
      _stage_image = placeholderImages[_flow_type][predefinedBuilds?.build_segment as ProductPredefinedPresets]
    }
    setCurrentModelOnStage(_stage_image);
    // console.log({_stage_image});
    
  }, [_category_slug, buildFlowType, placeholderImages, predefinedBuilds?.build_segment, setCurrentModelOnStage])

  useLayoutEffect(() => {
    if (currentBuild) {
      const _current_in_build = currentBuild.find((d) => d.category_slug === _category_slug) || null
      setIsInBuild(_current_in_build);
      
      if (_current_in_build) {
        setSelectedItemID(_current_in_build._id)
        onSelectComponentItem(_current_in_build._id)
      } else { // show image for current component instead then
        // check for placeholder image
      setSelectedItemID(null)
        handleSetCurrentPlaceholderImage();
        // check if single details is open so its closed
        if (showCurrentModelSpecs) {
          toggleShowSpecs(false)
        }
      }
    } else {
      // setSelectedItemID(null)
      // check for placeholder image
      handleSetCurrentPlaceholderImage();
    }
  }, [_category_slug, currentBuild])

  useEffect(() => {
    toggleCanViewSpecs(Boolean(selectedItemID));
  }, [selectedItemID])

  const [compareSelection, setCompareSelection] = useState<'product' | 'compare'>('product')

  function handleCompareSelection(selection: 'product' | 'compare') {
    setCompareSelection(selection)
  }

  function viewComparison() {
    navigate(`${RouteNames.buildCompareComponent}/processor?c1=${_.uniqueId()}&c2=${_.uniqueId()}`)
  }

  function handleAddComponentToBuild(_id: string) {
    toggleShowSpecs(false);
    toggleCanViewSpecs(false);
    toggleViewingComponentModel(false);
    setCurrentModelOnStage('');
    addComponentToBuild({ category_slug: _category_slug as IBuildStages["slug"], component_id: _id })
    navigate(`${RouteNames.buildPCMyBuild}`)
  }

  useEffect(() => {
    return () => {
      toggleCanViewSpecs(false);
      toggleShowSpecs(false);
      toggleViewingComponentModel(false);
      setCurrentModelOnStage('');
    }
  }, [])

  return (
    <BuildLayout layout_r_title={`${!showCurrentModelSpecs ? `Select a ${stageDetails?.title?.toLowerCase()}` : ''}`}>
      {!showCurrentModelSpecs && (
        <>
          {/* Comparison section */}
          {false && (
            <>
              <PolygonContainer>
                <div className="px-2 flex gap-2 items-center justify-center">
                  <span className="uppercase text-xs leading-[10px] whitespace-nowrap text-white-75">Component specs</span>
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
                <span className="uppercase text-xs leading-[10px] text-white-75">Component specs</span>
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
          {/* Comparison section */}

          <div className='flex flex-col gap-y-3'>
            {componentItems && componentItems.map((d) => (
              <Fragment key={_.uniqueId()}>
                <ChooseComponentItem
                  inBuild={_isInBuild?._id === d._id}
                  selected={d._id === selectedItemID}
                  data={d}
                  addToBuild={(id: string) => handleAddComponentToBuild(id)}
                  onClick={(id: string) => onSelectComponentItem(id)}
                />
              </Fragment>
            ))}
          </div>
        </>
      )}

      {showCurrentModelSpecs && (
        <SingleCompareComponents
          category_slug={_category_slug}
          selectedItemID={selectedItemID}
          handleAddComponentToBuild={handleAddComponentToBuild}
        />
      )}
    </BuildLayout>
  )
}

export default ChooseComponents