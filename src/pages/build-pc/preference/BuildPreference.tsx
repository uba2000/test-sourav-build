import { Fragment, useEffect, useMemo, useRef, useState } from "react"
import _ from "lodash"
import clsx from "clsx"

import Button from "../../../components/Button/Button"
import ImageFigure from "../../../components/ImageFigure"
import PolygonContainer from "../../../components/PolygonContainer/PolygonContainer"
import PageWrapper from "../../../components/Wrappers/PageWrapper"
import Step1GameType from "./components/Step1GameType/Step1GameType"
import Step2FPS from "./components/Step2FPS/Step2FPS"

import BackIcon from "../../../assets/nav-back-icon.svg"
import ReloadIcon from "../../../assets/nav-reload-icon.svg"
import ExternalIcon from "../../../assets/nav-external-link-icon.svg"
import RightArrow from "../../../assets/right-arrow.svg"
import Step3Resolution from "./components/Step3Resolution/Step3Resolution"
import { useNavigate, useSearchParams } from "react-router-dom"
import RouteNames from "../../../lib/utils/routenames"
import useBuildPCContext from "../../../lib/hooks/contextHooks/useBuildPCContext"
import { IFormatPreferencesDataReturn } from "../../../lib/utils/util-build-preference"
import { PreferenceResolutionsTitleType } from "../../../lib/types/context-types"

function BuildPreference() {
  const [searchParams] = useSearchParams();
  
  const navigate = useNavigate();
  const {
    preferences,
    resetApp,
    filterGameTitles, adjustFPSRange,
    analyzePreferencesForBuild
  } = useBuildPCContext()

  const [canProceed, setCanProceed] = useState(false);
  const [currentStage, setCurrentStage] = useState(parseInt((searchParams.get('s') || '0'), 10));
  const [preferenceFeed, setPreferenceFeed] = useState<IFormatPreferencesDataReturn[]>([])
  const [presentResolutions, setPresentResolutions] = useState<{
    [k in PreferenceResolutionsTitleType]: string[];
  }>({
    "4kuhd": [],
    fhd: [],
    qhd: []
  })

  const preferenceStages = useMemo(() => [
    {
      component: <Step1GameType />,
      description: ''
    },
    {
      component: <Step2FPS />,
      description: 'Simulated difference in FPS for display on a wide range of devices. Individual performance and results may vary. '
    },
    {
      component: <Step3Resolution availableRes={presentResolutions} />,
      description: ''
    }
  ], [presentResolutions])

  function nextStage() {
    let _preferenceFeed: IFormatPreferencesDataReturn[] = []
    if (currentStage === 0) {
      // filter list for each product to contain just game titles
      _preferenceFeed = filterGameTitles(preferences.game_type_title);
      setPreferenceFeed(_preferenceFeed)
    } else if (currentStage === 1) {
      // reduce minmax fps
      // remove any resolutions not within this range
      const _presentResolutions = adjustFPSRange([...preferenceFeed])
      setPresentResolutions(_presentResolutions)
    } else if (currentStage === 2) {
      analyzePreferencesForBuild(preferences)
    }

    if (currentStage === preferenceStages.length - 1) {
      navigate(RouteNames.buildPC)
      // initiate decision on products based on preferences here...
      return;
    }
    
    // console.log({ preferences, preferenceFeedState: preferenceFeed });
    setCanProceed(false)
    setCurrentStage(prev => prev + 1)
    navigate(`${RouteNames.buildPreferenceIndex}?s=${currentStage + 1}`)
  }

  function previousStage() {
    window.history.back();
  }

  useEffect(() => { 
    if ((currentStage === 0 && (preferences.game_type_title.length > 0))
      || ((currentStage === 1) && preferences.gaming_fps)
      || (currentStage === 2 && preferences.gaming_resolution)) {
      setCanProceed(true)
    } else {
      setCanProceed(false)
    }
  }, [preferences.game_type_title, currentStage, preferences.gaming_fps, preferences.gaming_resolution])

  useEffect(() => {
    const _current_index = parseInt((searchParams.get('s') || '0'), 10);

    if (_current_index > 0 && (preferences.game_type_title.length === 0 && !preferences.gaming_fps)) {
      navigate(`${RouteNames.buildPreferenceIndex}?s=0`)
    }

    setCurrentStage(parseInt((searchParams.get('s') || '0'), 10));
  }, [searchParams])

  const desktopChildDivRef = useRef<HTMLDivElement>(null);

  const scrollDesktopChildDivToTop = () => {
    const targetDiv = desktopChildDivRef.current;

    if (targetDiv) {
      targetDiv.scrollTop = 0;
    }
  };

  useEffect(() => { 
    scrollDesktopChildDivToTop()
  }, [searchParams])

  return (
    <PageWrapper>
      <div className="md:pt-10 pt-6 max-h-screen overflow-y-auto scroll-smooth" ref={desktopChildDivRef}>
        <div className="flex mb-10 md:justify-start justify-center max-[413px]:flex-wrap gap-y-3">
          <div className="max-[413px]:hidden">
            <PolygonContainer rightBorder={false} className="-mr-[1px]">
              <div className="px-[10px] flex gap-1">
                <button type="button" onClick={() => previousStage()}>
                  <ImageFigure icon={BackIcon} width={36} />
                </button>
                <button type="button" onClick={() => resetApp()}>
                  <ImageFigure icon={ReloadIcon} width={36} />
                </button>
                <button type="button">
                  <ImageFigure icon={ExternalIcon} width={36} />
                </button>
              </div>
            </PolygonContainer>
          </div>
          <div className="max-[413px]:block hidden">
            <PolygonContainer className="-mr-[1px]">
              <div className="px-[10px] flex gap-1">
                <button type="button" onClick={() => previousStage()}>
                  <ImageFigure icon={BackIcon} width={36} />
                </button>
                <button type="button" onClick={() => resetApp()}>
                  <ImageFigure icon={ReloadIcon} width={36} />
                </button>
                <button type="button">
                  <ImageFigure icon={ExternalIcon} width={36} />
                </button>
              </div>
            </PolygonContainer>
          </div>
          <PolygonContainer className="min-w-[277px]">
            <div className="flex items-center h-full gap-1 justify-center px-2">
              <p className="text-white-75 uppercase text-xs w-[112px] text-center block">
                Preferences
              </p>
              <div className="flex items-center gap-x-[9px]">
                <div className="flex gap-[2px]">
                  {preferenceStages.map((__, index) => (
                    <Fragment key={_.uniqueId()}>
                      <div className={clsx('min-w-[24px] h-1', {
                        'bg-gaming-blue': currentStage >= index,
                        'bg-[rgba(255,255,255,0.2)]': currentStage < index,
                      })} />
                    </Fragment>
                  ))}
                </div>
                <p className="text-sm font-medium">({currentStage + 1}/{preferenceStages.length})</p>
              </div>
            </div>
          </PolygonContainer>
        </div>

        <div className="max-w-[1026px] mx-auto px-6">
          {/* Children Section */}
          <div 
            className={clsx(
              { 'hidden': currentStage !== 0 },
              { 'block': currentStage === 0 },
            )}
          >
            {preferenceStages[0].component}
          </div>
          <div 
            className={clsx(
              { 'hidden': currentStage !== 1 },
              { 'block': currentStage === 1 },
            )}
          >
            {preferenceStages[1].component}
          </div>
          <div 
            className={clsx(
              { 'hidden': currentStage !== 2 },
              { 'block': currentStage === 2 },
            )}
          >
            {preferenceStages[2].component}
          </div>
          {/* Children Section */}
        </div>

        <div className="max-w-[1026px] mx-auto mb-6 px-6">
          <div
            className={clsx(
              "max-w-[930px] flex mt-6 gap-6 items-center",
              {"justify-between": preferenceStages[currentStage].description},
              {"justify-end": !preferenceStages[currentStage].description},
            )}
          >
            <p className="max-w-[459px] font-IntelOneBodyTextRegular text-intel-e-gray-t1 text-xs">
              {preferenceStages[currentStage].description}
            </p>
            <div>
              <Button disabled={!canProceed} onClick={() => nextStage()} className="min-w-[103px] py-2 px-6">
                <div className="flex gap-2 items-center">
                  <span className="text-intel-e-gray-s2 text-[15px] font-IntelOneBodyTextMedium leading-[15px]">Next</span>
                  <ImageFigure icon={RightArrow} width={12} />
                </div>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  )
}

export default BuildPreference