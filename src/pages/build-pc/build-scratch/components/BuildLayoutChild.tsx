import { Fragment, useLayoutEffect, useRef, useState } from 'react'

import CartIcon from '../../../../assets/cart.svg?react'
import BuildSpanner from '../../../../assets/component-icons/build.svg?react'
import NavLeftArrow from '../../../../assets/left-scroll-arrow.svg?react'
import NavRightArrow from '../../../../assets/right-scroll-arrow.svg?react'
import { formatNumberWithCommas } from '../../../../lib/utils/util-numbers';

import PolygonContainer from '../../../../components/PolygonContainer/PolygonContainer'
import clsx from 'clsx'
import useBuildPCContext from '../../../../lib/hooks/contextHooks/useBuildPCContext'
import useBuildPCStages from '../../../../lib/hooks/useBuildPCStages'
import { IBuildLayout } from './BuildLayout'
import Button from '../../../../components/Button/Button'
import { matchRoutes, useLocation, useNavigate } from 'react-router-dom'
import RouteNames from '../../../../lib/utils/routenames'
import _ from 'lodash'
import { IBuildStages } from '../../../../lib/types/context-types'
import CardWithNotch from '../../../../components/CardWithNotch/CardWithNotch'

const buildRoutes = [
  { path: "/build-pc" },
  { path: "/build-pc/build" },
  { path: "/build-pc/scratch" },
  { path: "/build-pc/preconfigured" },
]

function BuildLayoutChild({ children, stagesStatus = 'auto', layout_r_title, totalPrice, showPriceSection = false }: IBuildLayout) {
  const navigate = useNavigate()
  const mobileNavContainer = useRef<HTMLDivElement>(null);

  const {
    currentBuild, addToRetailerUsersCart
  } = useBuildPCContext();
  const { buildStages } = useBuildPCStages()

  const isOnBuildRoutes = matchRoutes(buildRoutes, location)

  function handleAddAllToCart() {
    addToRetailerUsersCart({ state: 'complete' })
  }

  function goToMyBuild() {
    navigate(RouteNames.buildPCMyBuild)
  }

  const scrollByPixels = ({ pixels = 42, dir = 'r' }: { pixels?: number; dir: 'r' | 'l' }) => {
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

  return (
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
            // ref={desktopChildDivRef}
            id='buildLayoutChildDIV'
            className={clsx(
              "px-6 md:pt-[12px] pt-3 pb-10 overflow-y-auto scrollbar-hide scroll-smooth",
              { "min-h-[670px] max-h-[670px]": !layout_r_title },
              { "min-h-[620px] max-h-[620px]": layout_r_title },
            )}
          >
            {children}
            {/* <Outlet /> */}
          </div>
        </PolygonContainer>
        <div className={
          clsx(
            'md:hidden block',
            { "mb-20": (currentBuild.length === buildStages.length || stagesStatus === 'complete' || showPriceSection) }
          )
        }>
          {layout_r_title && (
            <div className="md:px-[26px] px-4 md:py-3 pt-2 mt-1 pb-[10px] border-b border-[rgba(255,255,255,0.20)] md:border-white-75">
              <h1 className="md:text-h3 text-M-h2 font-IntelOneDisplayBold">
                {layout_r_title}
              </h1>
            </div>
          )}
          <div className="pt-3 px-4 overflow-y-auto md:min-h-[610px]">
            {children}
            {/* <Outlet /> */}
          </div>
        </div>
        {/* Right main section */}
        {/* Right price section */}
        {(currentBuild.length === buildStages.length || stagesStatus === 'complete' || showPriceSection) ? (
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
                      <span className="font-sans">$</span>
                      {formatNumberWithCommas(parseInt(totalPrice || "0") || currentBuild.reduce((sum, product) => sum + (product?.price || 0), 0))}
                    </span>
                    {/* <span className='text-[22px] font-IntelOneBodyTextMedium'>$3,478.99</span> */}
                  </span>
                </div>
              </PolygonContainer>
              <div className='flex items-center'>
                <Button variant='secondary' className='flex-grow' onClick={() => handleAddAllToCart()}>
                  <div className="flex gap-[6px] items-center py-2 px-3">
                    <CartIcon className='w-5 h-5' />

                    <span className="text-black font-IntelOneBodyTextMedium whitespace-nowrap text-sm">Add all to cart</span>
                  </div>
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className='min-h-[49px] md:block hidden'></div>
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
              { "bg-gaming-cobalt": isOnBuildRoutes }
            )}
          >
            <BuildSpanner className='w-[23px] h-[23px]' />
            <span className='font-IntelOneBodyTextMedium text-[10px] leading-[9px] whitespace-nowrap'>My Build</span>
          </div>
        </PolygonContainer>
        <PolygonContainer btr={false} bbr={false} leftBorder={false} className='flex-grow w-[calc(100%_-_69px)] -ml-[1px]'>
          <div className="relative">
            <button type='button' onClick={() => scrollByPixels({ dir: 'l' })} className="absolute left-0 z-10 -top-2 flex justify-center items-center border-r border-r-[#C5C5CB] h-[calc(100%_+_16px)] px-[6px]">
              <NavLeftArrow className='w-[6px] h-3' />
            </button>
            <button type='button' onClick={() => scrollByPixels({ dir: 'r' })} className="absolute right-0 z-10 -top-2 flex justify-center items-center border-l border-l-[#C5C5CB] h-[calc(100%_+_16px)] px-[6px]">
              <NavRightArrow className='w-[6px] h-3' />
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
              { "bg-gaming-cobalt": isOnBuildRoutes }
            )}
          >
            <BuildSpanner className='w-[34px] h-[34px]' />
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

function BuildSidebarItem({ data, screenSize, stagesStatus = 'auto' }: IBuildSidebarItem) {
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

export default BuildLayoutChild