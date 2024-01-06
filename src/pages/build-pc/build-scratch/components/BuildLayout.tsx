import React, { Fragment, useEffect, useRef, useState } from 'react'
import PolygonContainer from '../../../../components/PolygonContainer/PolygonContainer';
import clsx from 'clsx';
import _ from 'lodash';

import PageWrapper from '../../../../components/Wrappers/PageWrapper';
import Button from '../../../../components/Button/Button';

// import BackIcon from "../../../../assets/nav-back-icon.svg"
import ReloadIcon from "../../../../assets/nav-reload-icon.svg?react"
import RightArrow from "../../../../assets/right-arrow.svg?react"
import Image3D from '../../../../assets/assets-3d/build-3d-image.svg'
import useBuildPCStages from '../../../../lib/hooks/useBuildPCStages';
import { Outlet, useLocation } from 'react-router-dom';
import useBuildPCContext from '../../../../lib/hooks/contextHooks/useBuildPCContext';
import Modal from '../../../../components/Modal/Modal';
import NavLinkCopy from '../../../../components/NavLinkCopy/NavLinkCopy';
import Build3DModel from './Build3DModel';
import Div100vh from '../../../../components/Widgets/Div100vh';

export interface IBuildLayout {
  children: React.ReactNode;
  isCompareMode?: boolean;
  stagesStatus?: 'complete' | 'auto';
  layout_r_title?: string;
  totalPrice?: string;
  showPriceSection?: boolean;
}

function BuildLayout({ stagesStatus = 'auto' }) {
  const {
    currentBuild,
    resetApp, canViewSpecs,
    addToRetailerUsersCart, addToCartState,
    currentModelOnStage, toggleShowSpecs,
    showCurrentModelSpecs, thankYouModalOpen
  } = useBuildPCContext();
  const { buildStages } = useBuildPCStages()

  // states of the 3D model
  // 1. empty view for initial state
  // 2. position for current component
  // 3. view of selected component
  // 4. fixed in state of selected components

  const location = useLocation()

  const [currentModel, setCurrentModel] = useState(Image3D)

  const desktopChildDivRef = useRef<HTMLDivElement>(document.querySelector('#buildLayoutChildDIV'));
  const [prevScrollPos, setPrevScrollPos] = useState<number | null>(null);

  const scrollDesktopChildDivToTop = () => {
    const targetDiv = desktopChildDivRef.current;

    if (targetDiv) {
      setPrevScrollPos(targetDiv.scrollTop);
      targetDiv.scrollTop = 0;
    }
  };

  const scrollToPreviousPosition = () => {
    const targetDiv = desktopChildDivRef.current;

    if (targetDiv) {
      targetDiv.scrollTop = prevScrollPos as number;
    }
  };

  function handleViewSpec() {
    scrollDesktopChildDivToTop();
    toggleShowSpecs(true);
  }

  useEffect(() => {
    if (!showCurrentModelSpecs && prevScrollPos) {
      scrollToPreviousPosition()
    }
  }, [showCurrentModelSpecs])

  useEffect(() => {
    // if (currentModelOnStage && !viewingCurrentComponentModel) {
    if (currentModelOnStage) {
      setCurrentModel(currentModelOnStage)
    } else {
      setCurrentModel(Image3D)
    }
  }, [currentModelOnStage])

  return (
    <Div100vh className='overflow-y-auto scroll-smooth'>
      <PageWrapper maxWidth={'100%'}>
        {/* Add to Cart Modal */}
        <Modal
          onClose={() => addToRetailerUsersCart({ state: 'complete' })}
          visible={thankYouModalOpen}
          title='Thank You'
          description={`Your component${addToCartState === 'complete' ? 's' : ''} have been added to \nyour cart.`}
        />
        {/* Add to Cart Modal */}
        <div className='md:pt-10 pt-5 md:pb-10 pb-5 overflow-x-hidden max-w-[1200px] mx-auto w-full'>
          {/* Top Nav */}
          <div className="flex mb-2 md:justify-start justify-center">
            <PolygonContainer rightBorder={false} className="-mr-[1px] relative">
              <div className="px-[10px] flex gap-1 items-center">
                <button type="button" onClick={() => resetApp()}>
                  <ReloadIcon className='w-[36px] h-[36px]' />
                </button>
                <NavLinkCopy link={`https://dev.d26ohjimvrz87s.amplifyapp.com${location.pathname}`} />
              </div>
            </PolygonContainer>
            <PolygonContainer className="min-w-[246px]">
              <div className="flex items-center h-full gap-1 justify-center px-2">
                <p className="text-white-75 uppercase text-xs w-[100px] text-center block">Components</p>
                <div className="flex items-center gap-x-[9px]">
                  <div className="flex gap-[2px]">
                    {buildStages.map((__, index) => (
                      <Fragment key={_.uniqueId()}>
                        <div className={clsx('min-w-[8px] h-1', {
                          'bg-gaming-blue': ((currentBuild.length - 1) >= index || stagesStatus === 'complete'),
                          'bg-[rgba(255,255,255,0.2)]': ((currentBuild.length - 1) < index && stagesStatus === 'auto'),
                        })} />
                      </Fragment>
                    ))}
                  </div>
                  <p className="text-sm font-medium">
                    ({stagesStatus === 'auto'
                      ? (((currentBuild.length - 1) + 1) > buildStages.length) ? buildStages.length : (currentBuild.length - 1) + 1
                      : buildStages.length}/{buildStages.length})
                  </p>
                </div>
              </div>
            </PolygonContainer>
          </div>
          {/* End of Top Nav */}

          <div
            className={clsx(
              "md:min-h-[640px] grid md:grid-cols-[auto_544px] grid-cols-1 gap-x-4 gap-y-3",
            )}
          >
            {/* {!isCompareMode && ( */}
            <div className="md:py-6 pt-6 flex-col gap-y-4 flex md:pb-[57px]">
              <div className='flex-grow w-full min-w-[180px] min-h-[180px] flex justify-center items-center'>
                <div className='md:max-w-full max-w-full w-full md:max-h-full max-h-full h-full'>
                  <Build3DModel placeholder={currentModel} />
                </div>
              </div>
              <div className="flex justify-end md:pr-0 pr-4 min-h-[31px]">
                {/* {(viewingCurrentComponentModel &&  && canViewSpecs) && ( */}
                {(canViewSpecs && !showCurrentModelSpecs) && (
                  <Button className=" py-2 px-4" onClick={() => handleViewSpec()}>
                    <div className="flex gap-2 items-center">
                      <span className="text-intel-e-gray-s2 text-[15px] font-IntelOneBodyTextMedium leading-[15px]">View specs</span>
                      <RightArrow className='w-3 h-3' />
                    </div>
                  </Button>
                )}
              </div>
            </div>
            {/* )} */}
            <Outlet context={{

            }} />
          </div>
        </div>
      </PageWrapper>
    </Div100vh>
  )
}

BuildLayout.HeaderTitle = function BuildLayoutHeaderTitle({ title, subTitle }: { title?: string; subTitle?: string }) {
  return (
    <div className='mb-4 flex flex-col gap-y-3'>
      {title && (
        <h1 className="text-M-h1 font-IntelOneDisplayBold">
          {title}
        </h1>
      )}
      {subTitle && (
        <p className='text-sm font-IntelOneBodyTextRegular'>
          {subTitle}
        </p>
      )}
    </div>
  )
}

BuildLayout.HeaderGroup = function BuildLayoutHeaderGroup({ title }: { title: string; }) {
  return (
    <div className="md:-mx-6 -mx-4 md:px-[26px] md:-mt-[11px] mb-6 px-4 md:pb-3 pb-[10px] border-b border-white-75">
      <h1 className="md:text-h3 text-M-h2 font-IntelOneDisplayBold">
        {title}
      </h1>
    </div>
  )
}





export default BuildLayout