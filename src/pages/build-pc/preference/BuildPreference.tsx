import { Fragment, useEffect, useMemo, useRef, useState } from "react"
import _ from "lodash"
import clsx from "clsx"

import Button from "../../../components/Button/Button"
import PolygonContainer from "../../../components/PolygonContainer/PolygonContainer"
import PageWrapper from "../../../components/Wrappers/PageWrapper"
import Step1GameType from "./components/Step1GameType/Step1GameType"
import Step2FPS from "./components/Step2FPS/Step2FPS"

import BackIcon from "../../../assets/nav-back-icon.svg?react"
import ReloadIcon from "../../../assets/nav-reload-icon.svg?react"
import RightArrow from "../../../assets/right-arrow.svg?react"
import Step3Resolution from "./components/Step3Resolution/Step3Resolution"
import { useLocation, useNavigate, useSearchParams } from "react-router-dom"
import RouteNames from "../../../lib/utils/routenames"
import useBuildPCContext from "../../../lib/hooks/contextHooks/useBuildPCContext"
import { IFormatPreferencesDataReturn } from "../../../lib/utils/util-build-preference"
import { PreferenceResolutionsTitleType } from "../../../lib/types/context-types"
import NavLinkCopy from "../../../components/NavLinkCopy/NavLinkCopy"
import { noPreferenceName } from "./BuildGamePreferences"
import Div100vh from "../../../components/Widgets/Div100vh"
import { CONSTANT_BASE_URL } from "../../../lib/utils/util-constants"

function BuildPreference() {
  const location = useLocation()
  const [searchParams] = useSearchParams();

  const navigate = useNavigate();
  const {
    preferences, setGamingPreference,
    resetApp, preferenceGameTypes,
    filterGameTitles, adjustFPSRange,
    analyzePreferencesForBuild,
    analyzeNoPreferenceForBuild,
  } = useBuildPCContext()

  const [canProceed, setCanProceed] = useState(false);
  const [onNoPreferenceFlow, setOnNoPreferenceFlow] = useState(false);
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
      setOnNoPreferenceFlow(preferences.game_type_title.includes(noPreferenceName));
      setPreferenceFeed(_preferenceFeed)
    } else if (currentStage === 1) {
      // reduce minmax fps
      // remove any resolutions not within this range
      const _presentResolutions = adjustFPSRange([...preferenceFeed])
      setPresentResolutions(_presentResolutions)
    } else if (currentStage === 2) {
      if (!onNoPreferenceFlow) {
        analyzePreferencesForBuild(preferences)
      } else {
        // no preference build
        analyzeNoPreferenceForBuild(preferences, preferenceGameTypes)
        setGamingPreference('game_type_title', preferenceGameTypes.filter((d) => d.title !== noPreferenceName).map(d => d.title))
      }
    }

    if (currentStage === preferenceStages.length - 1) {
      navigate(RouteNames.buildPC)
      // initiate decision on products based on preferences here...
      return;
    }

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
    const targetDiv = document.querySelector('#preference_container');

    if (targetDiv) {
      targetDiv.scrollTop = 0;
    }
  };

  useEffect(() => {
    scrollDesktopChildDivToTop()
  }, [searchParams])

  return (
    <Div100vh className='overflow-y-auto scroll-smooth' id="preference_container">
      <PageWrapper maxWidth={'100%'}>
        <div ref={desktopChildDivRef} className="max-h-full overflow-hidden scroll-smooth">
          <div className="animate-fadeInUp md:pt-10 pt-6 max-w-[1200px] mx-auto" >
            <div className="flex mb-10 md:justify-start justify-center max-[413px]:flex-wrap gap-y-3">
              <div className="max-[413px]:hidden">
                <PolygonContainer rightBorder={false} className="-mr-[1px]">
                  <div className="px-[10px] flex gap-1">
                    <button type="button" onClick={() => previousStage()}>
                      <BackIcon className="w-[36px] h-[36px]" />
                    </button>
                    <button type="button" onClick={() => resetApp()}>
                      <ReloadIcon className="w-[36px] h-[36px]" />
                    </button>
                    <NavLinkCopy link={`${CONSTANT_BASE_URL}${location.pathname}`} />
                  </div>
                </PolygonContainer>
              </div>
              <div className="max-[413px]:block hidden">
                <PolygonContainer className="-mr-[1px]">
                  <div className="px-[10px] flex gap-1">
                    <button type="button" onClick={() => previousStage()}>
                      <BackIcon className="w-[36px] h-[36px]" />
                    </button>
                    <button type="button" onClick={() => resetApp()}>
                      <ReloadIcon className="w-[36px] h-[36px]" />
                    </button>
                    <NavLinkCopy link={`${CONSTANT_BASE_URL}${location.pathname}`} />
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
                  { "justify-between": preferenceStages[currentStage].description },
                  { "justify-end": !preferenceStages[currentStage].description },
                )}
              >
                <p className="max-w-[459px] font-IntelOneBodyTextRegular text-intel-e-gray-t1 text-xs">
                  {preferenceStages[currentStage].description}
                </p>
                <div>
                  <Button disabled={!canProceed} onClick={() => nextStage()} className="min-w-[103px] py-2 px-6">
                    <div className="flex gap-2 items-center">
                      <span className="text-intel-e-gray-s2 text-[15px] font-IntelOneBodyTextMedium leading-[15px]">Next</span>
                      <RightArrow className="w-3 h-3" />
                    </div>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </PageWrapper>
    </Div100vh>
  )
}

export default BuildPreference