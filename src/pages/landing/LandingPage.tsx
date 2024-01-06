import PageWrapper from '../../components/Wrappers/PageWrapper'
import CardWithNotch from '../../components/CardWithNotch/CardWithNotch'
import { Fragment, useMemo } from 'react'

// import RetailerIcon from '../../assets/retailer-logo.png'
import InfoPointer from '../../assets/info-pointer.svg?react'
import BuildScrewIcon from '../../assets/build-screw.svg?react'
import FindMagnifierIcon from '../../assets/find-magnifier.svg?react'
import LandingHeroImage from '../../assets/landing-page-hero-image.svg?react'
// import LandingHeroMobileImage from '../../assets/landing-page-hero-image-moble.svg?react'
import LandingHeroMobileImage2 from '../../assets/landing-page-hero-image-moble.svg'
import { Link } from 'react-router-dom'
import RouteNames from '../../lib/utils/routenames'

type LandingPointsType = {
  title: string,
  description?: string | JSX.Element,
}[]


function LandingPage() {
  const LandingPoints = useMemo<LandingPointsType>(() => [
    { title: 'Set your goals', description: 'Game titles. Resolution. FPS. Tell us what you want, we’ll deliver the performance you need.' },
    {
      title: 'Explore your options', description: 'Select components or systems for performance, specs and price to find the right fit.'
    },
    {
      title: 'Optimize. Maximize.', description: 'Fine tune preferences to perfect your build.'
    },
  ], []);

  return (
    <div className="animate-fadeInUp relative bg-no-repeat bg-top h-full bg-contain flex flex-col justify-center overflow-y-auto overflow-x-hidden">
      <PageWrapper className='flex md:justify-center h-full'>
        {/* Hero Section */}
        <div className='md:absolute object-center md:block hidden left-1/2 -translate-x-1/2 top-0 w-full max-w-[1200px]'>
          <LandingHeroImage />
        </div>

        {/* <div className=''>
          <LandingHeroImage className='md:absolute object-center md:block hidden left-1/2 -translate-x-1/2 -top-[56px] w-full max-w-[1200px] overflow-hidden' />
        </div> */}
        <div className="bg-transparent pb-6 md:mt-[85px] mt-[22px] flex relative z-10 flex-col gap-y-6 md:mb-[160px] md:min-h-[unset] min-h-[240px]">
          <div className="text-center relative z-10">
            <h1 className="md:text-h1 text-M-h1 font-IntelOneDisplayBold md:mb-4 mb-1">Up your game</h1>
            <h2 className='md:text-h2 text-M-h2 font-IntelOneDisplayMedium'>Build or find your next gaming PC</h2>
          </div>
          {/* md:hidden block */}
          {/* <div className='absolute left-0 top-0 w-full'>
            <LandingHeroMobileImage />
          </div> */}
          <img src={LandingHeroMobileImage2} className='absolute left-0 top-0 w-full object-center object-contain md:hidden block' />
          <div className=""></div>
        </div>

        <div className="bg-transparent relative z-10 py-6 flex flex-col gap-y-11">
          <div className="grid md:grid-cols-3  gap-y-3 grid-cols-1 gap-x-[46px] max-w-[1024px] mx-auto w-full md:px-0 px-10">
            {LandingPoints.map((d, index) => (
              <Fragment key={index}>
                <CardWithNotch>
                  <div className="flex gap-[10px] py-2 px-5">
                    <div>
                      <InfoPointer className='w-5 h-5' />
                    </div>
                    <div className='flex flex-col gap-y-3'>
                      <h3 className="md:text-h3 text-M-h2 font-IntelOneDisplayBold">{d.title}</h3>
                      <p className='text-sm md:text-base'>
                        {d.description}
                      </p>
                    </div>
                  </div>
                </CardWithNotch>
              </Fragment>
            ))}
          </div>

          <div className="grid md:grid-cols-2 grid-cols-1 max-w-fit w-full gap-x-[36px] gap-y-4 mx-auto">
            <Link to={RouteNames.buildPreferenceIndex} className='flex justify-center'>
              <button type='button' className='relative flex py-3 px-4 bg-gaming-blue min-w-[192px] hover:bg-gaming-blue-hover with-ease'>
                <div className='flex items-center gap-x-2'>
                  <div>
                    <BuildScrewIcon className='w-5 h-5' />
                  </div>
                  <span className='md:text-lg md:leading-[18px] text-base whitespace-nowrap text-intel-cobalt-s2 font-IntelOneDisplayMedium font-bold'>Build a gaming PC</span>
                </div>
              </button>
            </Link>

            <Link target='_blank' to={'https://retailer.portinos.com/srt-gaming'} className='flex justify-center'>
              <button type='button' className='relative flex py-3 px-4 bg-intel-e-blue-t1 min-w-[192px] hover:bg-intel-e-blue-t1-hover with-ease'>
                <div className='flex items-center gap-x-2'>
                  <div>
                    <FindMagnifierIcon className='w-5 h-5' />
                  </div>
                  <span className='md:text-lg md:leading-[18px] text-base whitespace-nowrap text-intel-cobalt-s2 font-IntelOneDisplayMedium font-bold'>Find a gaming PC</span>
                </div>
              </button>
            </Link>
          </div>
        </div>
      </PageWrapper>
    </div>
  )
}

export default LandingPage