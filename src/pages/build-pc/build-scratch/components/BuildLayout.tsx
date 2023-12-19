import React, { Fragment, useEffect, useLayoutEffect, useRef, useState } from 'react'
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
import RightArrow from "../../../../assets/right-arrow.svg"
import BuildSpanner from '../../../../assets/component-icons/build.svg'
import Image3D from '../../../../assets/assets-3d/build-3d-image.svg'
import NavLeftArrow from '../../../../assets/left-scroll-arrow.svg'
import NavRightArrow from '../../../../assets/right-scroll-arrow.svg'
import useBuildPCStages from '../../../../lib/hooks/useBuildPCStages';
import { matchRoutes, useLocation, useNavigate } from 'react-router-dom';
import CardWithNotch from '../../../../components/CardWithNotch/CardWithNotch';
import { IBuildStages } from '../../../../lib/types/context-types';
import useBuildPCContext from '../../../../lib/hooks/contextHooks/useBuildPCContext';
import RouteNames from '../../../../lib/utils/routenames';
import { formatNumberWithCommas } from '../../../../lib/utils/util-numbers';
import Modal from '../../../../components/Modal/Modal';

interface IBuildLayout {
  children: React.ReactNode;
  isCompareMode?: boolean;
  stagesStatus?: 'complete' | 'auto';
  layout_r_title?: string;
  totalPrice?: string;
  showPriceSection?: boolean;
}

const buildRoutes = [
  { path: "/build-pc" },
  { path: "/build-pc/build" },
  { path: "/build-pc/scratch" },
  { path: "/build-pc/preconfigured" },
]

function BuildLayout({ children, isCompareMode = false, stagesStatus = 'auto', layout_r_title, totalPrice, showPriceSection = false }: IBuildLayout) {
  const {
    currentBuild,
    resetApp, canViewSpecs,
    addToRetailerUsersCart,
    currentModelOnStage, toggleShowSpecs,
    showCurrentModelSpecs
  } = useBuildPCContext();
  const mobileNavContainer = useRef<HTMLDivElement>(null);
  const navigate = useNavigate()
  const { buildStages } = useBuildPCStages()
  // console.log({currentBuild});

  // states of the 3D model
  // 1. empty view for initial state
  // 2. position for current component
  // 3. view of selected component
  // 4. fixed in state of selected components
  
  const location = useLocation()
  const isOnBuildRoutes = matchRoutes(buildRoutes, location)

  const [currentModel, setCurrentModel] = useState(Image3D)

  const desktopChildDivRef = useRef<HTMLDivElement>(null);
  const [prevScrollPos, setPrevScrollPos] = useState<number | null>(null);

  function handleAddAllToCart() {
    addToRetailerUsersCart({ state: 'complete' })
  }

  function goToMyBuild() {
    navigate(RouteNames.buildPCMyBuild)
  }

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

  const scrollByPixels = ({ pixels = 42, dir = 'r'}: { pixels?: number; dir: 'r' | 'l' }) => {
    // Access the current property of the ref to get the DOM element
    const targetDiv = mobileNavContainer.current;

    // Scroll the div horizontally by the specified number of pixels
    if (targetDiv) {
      if (dir === 'r') {
        targetDiv.scrollLeft += pixels;
      } else if (dir === 'l') {
        targetDiv.scrollLeft -= pixels;
      }
    }
  };

  useEffect(() => { 
    if (!showCurrentModelSpecs && prevScrollPos) {
      scrollToPreviousPosition()
    }
  }, [showCurrentModelSpecs])

  useEffect(() => { 
    // if (currentModelOnStage && !viewingCurrentComponentModel) {
    if (currentModelOnStage) {
      // console.log("currentModelOnStage", currentModelOnStage);
      setCurrentModel(currentModelOnStage)
    } else {
      setCurrentModel(Image3D)
    }
  }, [currentModelOnStage])

  return (
    <PageWrapper>
      <Modal />
      <div className='md:pt-10 pt-5 md:pb-10 pb-5 overflow-x-hidden'>
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
            "min-h-[640px]",
            {"grid md:grid-cols-[auto_544px] grid-cols-1 gap-x-4 gap-y-3": !isCompareMode},
          )}
        >
          {/* {!isCompareMode && ( */}
          <div className="md:py-6 pt-6 flex-col gap-y-4 flex md:pb-[57px]">
            <div className='flex-grow w-full min-w-[180px] min-h-[180px] flex justify-center items-center'>
              <div className='hidden md:block'>
                <ImageFigure icon={currentModel} width={481} />
              </div>
              <div className='block md:hidden'>
                <ImageFigure icon={currentModel} width={190} />
              </div>
            </div>
            <div className="flex justify-end md:pr-0 pr-4 min-h-[31px]">
              {/* {(viewingCurrentComponentModel &&  && canViewSpecs) && ( */}
              {(canViewSpecs && !showCurrentModelSpecs) && (
                <Button className=" py-2 px-4" onClick={() => handleViewSpec()}>
                  <div className="flex gap-2 items-center">
                    <span className="text-intel-e-gray-s2 text-[15px] font-IntelOneBodyTextMedium leading-[15px]">View specs</span>
                    <ImageFigure icon={RightArrow} width={12} />
                  </div>
                </Button>
              )}
            </div>
          </div>
          {/* )} */}
          <div className="flex md:flex-nowrap flex-wrap-reverse gap-x-4">
            <div className='flex flex-col md:max-w-[460px] md:min-w-[460px] flex-grow md:gap-y-2 gap-y-4'>
              
              {/* Right main section */}
              <PolygonContainer bbr={false} btl={false} className='flex-grow max-w-[978px] w-full ml-auto md:block hidden'>
                {layout_r_title && (
                  <div className="md:px-[26px] px-4 md:py-3 pt-2 pb-[10px] border-b border-white-75">
                    <h1 className="md:text-h3 text-M-h2 font-IntelOneDisplayBold">
                      {layout_r_title}
                    </h1>
                  </div>
                )}
                <div
                  ref={desktopChildDivRef}
                  className={clsx(
                    "px-6 md:pt-[12px] pt-3 pb-10 overflow-y-auto scrollbar-hide scroll-smooth",
                    {"min-h-[670px] max-h-[670px]": !layout_r_title},
                    {"min-h-[620px] max-h-[620px]": layout_r_title},
                  )}
                >
                  {children}
                </div>
              </PolygonContainer>
              <div className='md:hidden block mb-20'>
                {layout_r_title && (
                <div className="md:px-[26px] px-4 md:py-3 pt-2 mt-1 pb-[10px] border-b border-[rgba(255,255,255,0.20)] md:border-white-75">
                  <h1 className="md:text-h3 text-M-h2 font-IntelOneDisplayBold">
                    {layout_r_title}
                  </h1>
                </div>
                )}
                <div className="pt-3 px-4 overflow-y-auto min-h-[610px]">
                  {children}
                </div>
              </div>
              {/* Right main section */}
              {/* Right price section */}
              {(currentBuild.length === buildStages.length || stagesStatus === 'complete' || showPriceSection) && (
                <div
                  className={clsx(
                    'md:min-h-[49px] max-w-full w-full md:px-0 px-4',
                    'md:relative fixed z-40',
                    'md:bottom-[unset] bottom-0',
                    'md:left-[unset] left-0',
                    'md:block flex items-center',
                    'md:h-[unset] h-[78px]',
                    'md:bg-none bg-[linear-gradient(180deg,#0C0021_33.54%,#000_60.37%)]',
                  )}
                >
                  <div className="flex md:justify-end justify-center gap-2 max-w-[400px] w-full md:ml-auto mx-auto md:mx-[unset]">
                    <PolygonContainer className='min-w-[209px]' defaultBorderBackground='#0C0021'>
                      <div className="flex flex-wrap flex-col px-5 gap-x-3 items-center justify-center h-full">
                        <span className='text-white-75 text-[10px] leading-[11px] whitespace-nowrap font-IntelOneBodyTextMedium uppercase'>Total Price</span>
                        <span className=''>
                          <span className='font-IntelOneBodyTextMedium'>
                            $
                            {formatNumberWithCommas(parseInt(totalPrice || "0") || currentBuild.reduce((sum, product) => sum + (product?.price || 0), 0))}
                          </span>
                          {/* <span className='text-[22px] font-IntelOneBodyTextMedium'>$3,478.99</span> */}
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
                </div>
              )}
              {/* Right price section */}
            </div>
            {/* Mobile right bar */}
            <div className="md:hidden flex w-[calc(100%_+_2px)] h-fit -mx-[1px]">
              <PolygonContainer btl={false} bbl={false} className='' rightBackground={isOnBuildRoutes ? 'primary' : null}>
                <div
                  onClick={() => goToMyBuild()}
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
                  <button type='button' onClick={() => scrollByPixels({ dir: 'l' })} className="absolute left-0 z-10 -top-2 flex justify-center items-center border-r border-r-[#C5C5CB] h-[calc(100%_+_16px)] px-[6px]">
                    <ImageFigure icon={NavLeftArrow} width={6} height={12} />
                  </button>
                  <button type='button' onClick={() => scrollByPixels({ dir: 'r' })} className="absolute right-0 z-10 -top-2 flex justify-center items-center border-l border-l-[#C5C5CB] h-[calc(100%_+_16px)] px-[6px]">
                    <ImageFigure icon={NavRightArrow} width={6} height={12} />
                  </button>
                  <div ref={mobileNavContainer} className='mr-[20px] px-[9px] ml-[20px] scroll-smooth flex gap-x-[6px] overflow-auto scrollbar-hide'>
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
            <PolygonContainer
              className='min-w-[68px] md:block hidden'
              bbr={false}
              btl={false}
              topBackground={isOnBuildRoutes ? 'primary' : null}
            >
              <div>
                <div
                  onClick={() => goToMyBuild()}
                  className={clsx(
                    "border-b border-b-white-75 py-2 px-3 flex flex-col items-center cursor-pointer gap-y-[3px] mb-2",
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

BuildLayout.HeaderGroup = function BuildLayoutHeaderGroup({ title }: {title: string;}) {
  return (
    <div className="md:-mx-6 -mx-4 md:px-[26px] md:-mt-[11px] mb-6 px-4 md:pb-3 pb-[10px] border-b border-white-75">
      <h1 className="md:text-h3 text-M-h2 font-IntelOneDisplayBold">
        {title}
      </h1>
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
  const navigate = useNavigate()
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

  useLayoutEffect(() => { 
    if (isOnBuildRoutes) {
      
      if (isOnBuildRoutes[0].params.category_slug === data.slug) {
        setIsSelected(isOnBuildRoutes[0].params.category_slug === data.slug)
        setBackgroundColor('#00FFFC')
        setIsCompleted(false)
      }
    }
  }, [data.slug, isOnBuildRoutes])

  function goToComponent() {
    navigate(`${RouteNames.buildChooseComponent}/${data.slug}`)
  }

  return (
    <div onClick={() => goToComponent()}>
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