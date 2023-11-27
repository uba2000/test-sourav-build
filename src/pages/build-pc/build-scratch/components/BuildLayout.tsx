import React, { Fragment, useEffect, useLayoutEffect, useState } from 'react'
import PolygonContainer from '../../../../components/PolygonContainer/PolygonContainer';
import ImageFigure from '../../../../components/ImageFigure';
import clsx from 'clsx';
import _ from 'lodash';

import PageWrapper from '../../../../components/Wrappers/PageWrapper';
import Button from '../../../../components/Button/Button';

// import BackIcon from "../../../../assets/nav-back-icon.svg"
import ReloadIcon from "../../../../assets/nav-reload-icon.svg"
import ExternalIcon from "../../../../assets/nav-external-link-icon.svg"
import CartIcon from '../../../../assets/cart.svg'

import BuildSpanner from '../../../../assets/component-icons/build.svg'
import Image3D from '../../../../assets/assets-3d/build-3d-image.svg'
import NavLeftArrow from '../../../../assets/left-scroll-arrow.svg'
import NavRightArrow from '../../../../assets/right-scroll-arrow.svg'
import useBuildPCStages from '../../../../lib/hooks/useBuildPCStages';
import { matchRoutes, useLocation } from 'react-router-dom';
import CardWithNotch from '../../../../components/CardWithNotch/CardWithNotch';
import { IBuildStages } from '../../../../lib/types/context-types';
import useBuildPCContext from '../../../../lib/hooks/contextHooks/useBuildPCContext';

interface IBuildLayout {
  children: React.ReactNode;
  isCompareMode?: boolean;
  stagesStatus?: 'complete' | 'auto';
  buildModel?: string;
}

const buildRoutes = [
  { path: "/build-pc" },
  { path: "/build-pc/build" },
  { path: "/build-pc/scratch" },
  { path: "/build-pc/preconfigured" },
]

function BuildLayout({children, isCompareMode=false, stagesStatus='auto', buildModel}: IBuildLayout) {
  const { buildStages } = useBuildPCStages()
  const {
    currentBuild,
    resetApp,
    addToRetailerUsersCart,
    currentBuildStage: currentStage
  } = useBuildPCContext()

  // states of the 3D model
  // 1. empty view for initial state
  // 2. position for current component
  // 3. view of selected component
  // 4. fixed in state of selected components
  
  const location = useLocation()
  const isOnBuildRoutes = matchRoutes(buildRoutes, location)

  function handleAddAllToCart() {
    addToRetailerUsersCart({ state: 'complete' })
  }

  return (
    <PageWrapper>
      <div className='md:pt-10 pt-5 md:pb-0 pb-5 overflow-x-hidden'>
        {/* Top Nav */}
        <div className="flex mb-2 md:justify-start justify-center">
          <PolygonContainer rightBorder={false} className="-mr-[1px]">
            <div className="px-[10px] flex gap-1">
              {/* <button type="button" onClick={() => previousStage()}>
                <ImageFigure icon={BackIcon} width={36} />
              </button> */}
              <button type="button" onClick={() => resetApp()}>
                <ImageFigure icon={ReloadIcon} width={36} />
              </button>
              <button type="button">
                <ImageFigure icon={ExternalIcon} width={36} />
              </button>
            </div>
          </PolygonContainer>
          <PolygonContainer className="min-w-[246px]">
            <div className="flex items-center h-full gap-1 justify-center px-2">
              <p className="text-[rgba(255,255,255,0.75)] uppercase text-xs w-[100px] text-center block">Components</p>
              <div className="flex items-center gap-x-[9px]">
                <div className="flex gap-[2px]">
                  {buildStages.map((__, index) => (
                    <Fragment key={_.uniqueId()}>
                      <div className={clsx('min-w-[8px] h-1', {
                        'bg-gaming-blue': (currentStage >= index || stagesStatus === 'complete'),
                        'bg-[rgba(255,255,255,0.2)]': (currentStage < index && stagesStatus === 'auto'),
                      })} />
                    </Fragment>
                  ))}
                </div>
                <p className="text-sm font-medium">
                  ({stagesStatus === 'auto' ? currentStage + 1 : buildStages.length}/{buildStages.length})
                </p>
              </div>
            </div>
          </PolygonContainer>
        </div>
        {/* End of Top Nav */}
        
        <div
          className={clsx(
            "min-h-[640px]",
            {"grid md:grid-cols-[auto_484px] grid-cols-1 gap-x-4 gap-y-3": !isCompareMode},
          )}
        >
          {!isCompareMode && (
            <div className="py-6 flex justify-center items-center">
              <div className='hidden md:block'>
                <ImageFigure icon={buildModel || Image3D} width={481} />
              </div>
              <div className='block md:hidden'>
                <ImageFigure icon={buildModel || Image3D} width={190} />
              </div>
            </div>
          )}
          <div className="flex md:flex-nowrap flex-wrap-reverse gap-x-4">
            <div className='flex flex-col flex-grow md:gap-y-2 gap-y-4'>
              {/* Right main section */}
              <PolygonContainer className='flex-grow max-w-[978px] w-full ml-auto md:block hidden'>
                <div className="px-6 md:pt-[23px] pt-3 pb-10 min-h-[610px] max-h-[610px] overflow-y-auto scrollbar-hide">
                  {children}
                </div>
              </PolygonContainer>
              <div className="pt-3 px-4 overflow-y-auto md:hidden block min-h-[610px]">
                {children}
              </div>
              {/* Right main section */}
              {/* Right price section */}
              {(currentBuild.length === buildStages.length || stagesStatus === 'complete') && (
              <div className="flex justify-end gap-2 max-w-[400px] w-full md:ml-auto mx-auto md:mx-[unset]">
                <PolygonContainer className='min-w-[246px]'>
                  <div className="flex flex-wrap px-5 gap-x-3 items-center h-full">
                    <span className='text-[rgba(255,255,255,0.75)] text-xs whitespace-nowrap font-IntelOneBodyTextMedium'>Estimated price:</span>
                    <span className=''>
                      <span className='font-IntelOneBodyTextMedium'>$1,589.45 - </span>
                      <span className='text-[22px] font-IntelOneBodyTextMedium'>$3,478.99</span>
                    </span>
                  </div>
                </PolygonContainer>
                <div className='flex items-center'>
                  <Button variant='secondary' className='flex-grow' onClick={() => handleAddAllToCart()}>
                    <div className="flex gap-[6px] items-center py-2 px-3">
                      <ImageFigure icon={CartIcon} width={20} />
                      <span className="text-black font-IntelOneBodyTextMedium whitespace-nowrap text-sm">Add all to cart</span>
                    </div>
                  </Button>
                </div>
              </div>
              )}
              {/* Right price section */}
            </div>
            {/* Mobile right bar */}
            <div className="md:hidden flex w-[calc(100%_+_2px)] h-fit -mx-[1px]">
              <PolygonContainer btl={false} bbl={false} className='' rightBackground={isOnBuildRoutes ? 'primary' : null}>
                <div
                  className={clsx(
                    "px-3 flex flex-col items-center justify-center cursor-pointer h-full",
                    {"bg-gaming-cobalt": isOnBuildRoutes}
                  )}
                >
                  <ImageFigure icon={BuildSpanner} width={23} />
                  <span className='font-IntelOneBodyTextMedium text-[10px] leading-[9px] whitespace-nowrap'>My Build</span>
                </div>
              </PolygonContainer>
              <PolygonContainer btr={false} bbr={false} leftBorder={false} className='flex-grow w-[calc(100%_-_69px)] -ml-[1px]'>
                <div className="relative">
                  <div className="absolute left-0 z-10 -top-2 flex justify-center items-center border-r border-r-[#C5C5CB] h-[calc(100%_+_16px)] px-[6px]">
                    <ImageFigure icon={NavLeftArrow} width={6} height={12} />
                  </div>
                  <div className="absolute right-0 z-10 -top-2 flex justify-center items-center border-l border-l-[#C5C5CB] h-[calc(100%_+_16px)] px-[6px]">
                    <ImageFigure icon={NavRightArrow} width={6} height={12} />
                  </div>
                  <div className='mr-[20px] px-[9px] ml-[20px] flex gap-x-[6px] overflow-auto scrollbar-hide'>
                    {buildStages.map((d) => (
                      <Fragment key={_.uniqueId()}>
                        <BuildSidebarItem stagesStatus={stagesStatus} data={d} screenSize='mobile' />
                      </Fragment>
                    ))}
                  </div>
                </div>
              </PolygonContainer>
            </div>
            {/* Mobile right bar */}
            {/* Desktop right bar */}
            <PolygonContainer className='min-w-[68px] md:block hidden' bbr={false} topBackground={isOnBuildRoutes ? 'primary' : null}>
              <div>
                <div
                  className={clsx(
                    "border-b border-b-[rgba(255,255,255,0.75)] py-2 px-3 flex flex-col items-center cursor-pointer gap-y-[3px] mb-2",
                    {"bg-gaming-cobalt": isOnBuildRoutes}
                  )}
                >
                  <ImageFigure icon={BuildSpanner} width={34} />
                  <span className='font-IntelOneBodyTextMedium text-[10px] whitespace-nowrap'>My Build</span>
                </div>

                <div className='px-[9px] pb-2 flex flex-col gap-y-2'>
                  {buildStages.map((d) => (
                    <Fragment key={_.uniqueId()}>
                      <BuildSidebarItem stagesStatus={stagesStatus} data={d} screenSize='desktop' />
                    </Fragment>
                  ))}
                </div>
              </div>
            </PolygonContainer>
            {/* Desktop right bar */}
          </div>
        </div>  
      </div>
    </PageWrapper>
  )
}

BuildLayout.HeaderTitle = function BuildLayoutHeaderTitle({ title, subTitle }: { title: string; subTitle?: string}) {
  return (
    <div className='mb-4 flex flex-col gap-y-3'>
      <h1 className="text-M-h1 font-IntelOneDisplayBold">
        {title}
      </h1>
      {subTitle && (
      <p className='text-sm font-IntelOneBodyTextRegular'>
        {subTitle}
      </p>
      )}
    </div>
  )
}

const componentBuildRoutes = [
  { path: "/build-pc/choose-component/:category_slug" },
]

interface IBuildSidebarItem {
  data: IBuildStages;
  screenSize: 'mobile' | 'desktop'
  stagesStatus?: IBuildLayout['stagesStatus'];
}

function BuildSidebarItem({ data, screenSize, stagesStatus='auto' }: IBuildSidebarItem) {
  const location = useLocation()
  const isOnBuildRoutes = matchRoutes(componentBuildRoutes, location)
  
  const [isCompleted, setIsCompleted] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState('')

  const { currentBuild } = useBuildPCContext()

  useLayoutEffect(() => {
    const _a_processor_exist = currentBuild.find((d) => d.category_slug === data.slug);
    setIsCompleted(Boolean(_a_processor_exist))
  }, [currentBuild, data.slug])

  useLayoutEffect(() => {
    if (isCompleted || stagesStatus === 'complete') {
      setBackgroundColor('#1E2EB8')
    }
  }, [isCompleted])

  useEffect(() => { 
    if (isOnBuildRoutes) {
      
      if (isOnBuildRoutes[0].params.category_slug === data.slug) {
        setIsSelected(isOnBuildRoutes[0].params.category_slug === data.slug)
        setBackgroundColor('#00FFFC')
        setIsCompleted(false)
      }
    }
  }, [data.slug, isOnBuildRoutes])

  return (
    <div>
      {screenSize === 'mobile' && (
        <CardWithNotch backgroundColor={backgroundColor} notchHeight='small' btl={false} bbr={false} bbl>
          <div className="relative w-full min-w-[36px] h-5 cursor-pointer">
            <div className="relative w-full h-full flex justify-center items-center">
              {/* <ImageFigure icon={data.icon} width={20} /> */}
              <div className={clsx(
                "w-5 h-5",
                { "text-white": isCompleted && !isSelected },
                { "text-intel-cobalt-s2": isSelected && !isCompleted },
              )}>
                {data.icon}
              </div>
            </div>
          </div>
        </CardWithNotch>
      )}

      {screenSize === 'desktop' && (
        <CardWithNotch backgroundColor={backgroundColor} notchHeight='small' btl={false} bbr={false} bbl>
          <div className="relative w-full h-8 cursor-pointer">
            <div className="relative w-full h-full flex justify-center items-center">
              {/* <ImageFigure icon={data.icon} width={36} /> */}
              <div className={clsx(
                "w-9 h-9",
                { "text-white": isCompleted && !isSelected },
                { "text-intel-cobalt-s2": isSelected && !isCompleted },
                )}
              >
                {data.icon}
              </div>
            </div>
          </div>
        </CardWithNotch>
      )}
    </div>
  )
}

export default BuildLayout