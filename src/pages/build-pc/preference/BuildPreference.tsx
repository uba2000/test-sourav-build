import { Fragment, useEffect, useMemo, useState } from "react"
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
import { useNavigate } from "react-router-dom"
import RouteNames from "../../../lib/utils/routenames"
import useBuildPCContext from "../../../lib/hooks/contextHooks/useBuildPCContext"

function BuildPreference() {
  const navigate = useNavigate();
  const { preferences } = useBuildPCContext()
  const preferenceStages = useMemo(() => [
    <Step1GameType />,
    <Step2FPS />,
    <Step3Resolution />
  ], [])

  const [canProceed, setCanProceed] = useState(false);
  const [currentStage, setCurrentStage] = useState(0);

  function nextStage() {
    if (currentStage === preferenceStages.length - 1) {
      navigate(RouteNames.buildPC, { replace: true })
      return;
    }
    setCanProceed(false)
    setCurrentStage(prev => prev + 1)
  }

  function previousStage() {
    if (currentStage > 0) {
      setCurrentStage(prev => prev - 1)
    } else {
      window.history.back();
    }
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

  return (
    <PageWrapper>
      <div className="md:pt-10 pt-6">
        <div className="flex mb-10 md:justify-start justify-center">
          <PolygonContainer rightBorder={false} className="-mr-[1px]">
            <div className="px-[10px] flex gap-1">
              <button type="button" onClick={() => previousStage()}>
                <ImageFigure icon={BackIcon} width={36} />
              </button>
              <button type="button">
                <ImageFigure icon={ReloadIcon} width={36} />
              </button>
              <button type="button">
                <ImageFigure icon={ExternalIcon} width={36} />
              </button>
            </div>
          </PolygonContainer>
          <PolygonContainer className="min-w-[246px]">
            <div className="flex items-center h-full gap-1 justify-center px-2">
              <p className="text-[rgba(255,255,255,0.75)] uppercase text-xs w-[80px] text-center block">TARGETS</p>
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

        <div className="max-w-[1026px] mx-auto md:px-0 px-6">
          {/* Children Section */}
          {preferenceStages[currentStage]}
          {/* Children Section */}
        </div>

        <div className="max-w-[1026px] mx-auto mb-6 md:px-0 px-6">
          <div className="max-w-[930px]  flex justify-end mt-6">
            <Button disabled={!canProceed} onClick={() => nextStage()} className="py-2 px-6">
              <div className="flex gap-2 items-center">
                <span className="text-intel-e-gray-s2 text-[15px] font-IntelOneBodyTextMedium leading-[15px]">Next</span>
                <ImageFigure icon={RightArrow} width={12} />
              </div>
            </Button>
          </div>
        </div>
      </div>
    </PageWrapper>
  )
}

export default BuildPreference