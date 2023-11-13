import ImageFigure from '../../components/ImageFigure'
import PageWrapper from '../../components/Wrappers/PageWrapper'
import CardWithNotch from '../../components/CardWithNotch/CardWithNotch'
import { Fragment, useMemo } from 'react'

import RetailerIcon from '../../assets/retailer-logo.png'
import InfoPointer from '../../assets/info-pointer.svg'
import BuildScrewIcon from '../../assets/build-screw.svg'
import FindMagnifierIcon from '../../assets/find-magnifier.svg'

type LandingPointsType = {
  title: string,
  description?: string | JSX.Element,
}[]


function LandingPage() {
  const LandingPoints = useMemo<LandingPointsType>(() => [
    { title: 'Set your targets', description: 'Game titles. Resolution. FPS. Tell us what you want, we’ll deliver the performance you need.' },
    { title: 'Choose your weapons', description: 'Compare components or systems for performance, specs and price to find the right fit.' },
    { title: 'Optimize, Maximize', description: 'Fine tune preferences to perfect your build.' },
  ], [])

  return (
    <div className="bg-[url(/landing-page-hero-image.svg)] bg-no-repeat bg-top min-h-[779px]">
      <PageWrapper>
      {/* Hero Section */}
        <div className="bg-transparent py-6 flex flex-col gap-y-6 mb-[160px]">
          <div className="flex justify-end">
            <div className='opacity-[0.6] py-3 px-6'>
              <ImageFigure width={194} height={37} icon={RetailerIcon} />
            </div>
          </div>
          <div className="text-center">
            <h1 className="text-h1 mb-4">Up your game</h1>
            <h2 className='text-h2 font-medium'>Build or find your next gaming PC</h2>
          </div>
          <div className=""></div>
        </div>

        <div className="bg-transparent py-6 flex flex-col gap-y-11">
          <div className="grid grid-cols-3 grid-rows-[188px] gap-x-[46px] max-w-[1024px] mx-auto w-full">
            {LandingPoints.map((d, index) => (
              <Fragment key={index}>
                <CardWithNotch>
                  <div className="flex gap-[10px] py-2 px-5">
                    <div>
                      <ImageFigure icon={InfoPointer} />
                    </div>
                    <div className='flex flex-col gap-y-3'>
                      <h3 className="text-h3">{d.title}</h3>
                      <p>
                        {d.description}
                      </p>
                    </div>
                  </div>
                </CardWithNotch>
              </Fragment>
            ))}
          </div>

          <div className="flex max-w-fit mx-auto">
            <button type='button' className='relative flex -mr-[65px]'>
              <div className='flex items-center gap-x-4 min-h-[68px] bg-gaming-blue'>
                <div className='p-[10px]'>
                  <ImageFigure icon={BuildScrewIcon} width={48} />
                </div>
                <span className='text-xl text-intel-cobalt-s2 font-bold'>Build a gaming PC</span>
              </div>
              {/* <ImageFigure icon={BuildBtnNotch} width={68} /> */}
              <div className='border-t-[68px] bg-transparent border-t-gaming-blue border-r-[68px] border-r-transparent' />
            </button>
            <button type='button' className='relative flex'>
              {/* <ImageFigure icon={FindBtnNotch} width={68} /> */}
              <div className='border-b-[68px] bg-transparent border-b-intel-e-blue border-l-[68px] border-l-transparent' />
              <div className='flex items-center gap-x-4 min-h-[68px] bg-intel-e-blue'>
                <span className='text-xl text-intel-cobalt-s2 font-bold'>Find a gaming PC</span>
                <div className='p-[10px]'>
                  <ImageFigure icon={FindMagnifierIcon} width={48} />
                </div>
              </div>
            </button>
          </div>
        </div>
      </PageWrapper>
    </div>
  )
}

export default LandingPage