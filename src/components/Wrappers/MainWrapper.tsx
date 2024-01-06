import clsx from 'clsx';
import { Outlet, matchRoutes, useLocation } from 'react-router-dom';
import BuildPCContextWrapper from './BuildPCContextWrapper';
import RouteNames from '../../lib/utils/routenames';
import useBuildPCContext from '../../lib/hooks/contextHooks/useBuildPCContext';
import { useEffect } from 'react';
import { use100vh } from '../Widgets/Div100vh';
import RetailerLogo from '../../assets/dummy-retailer-logo.svg?react'

const normalFlow = [{ path: "/" }]
const preferenceFlow = [{ path: RouteNames.buildPreferenceIndex }]
const buildFlow = [{ path: "/build-pc/*" }, { path: RouteNames.resetSessionPage }]

export default function MainWrapper() {
  const location = useLocation()
  const isOnNormalFlow = matchRoutes(normalFlow, location)
  const isOnPreferenceFlow = matchRoutes(preferenceFlow, location)
  const isOnBuildFlow = matchRoutes(buildFlow, location)
  const height = use100vh();
  console.log('Build Version: v1.0.2');

  return (
    <BuildPCContextWrapper>
      <div className="App">
        <div className='pb-[2px]'>
          <div className='flex mb-[2px]'>
            <RetailerIcon />
            <div className="flex-1 bg-[#808080]" />
          </div>
          {/*  */}
          <div className="bg-[#AEAEAE] h-[30px]" />
        </div>
        <div style={{ height: height ? height - 94 as string | number : '100vh' }} className='flex flex-col'>
          <div className='overflow-y-auto scroll-smooth flex flex-col max-h-full flex-1' id="app_container">
            <ValidateBuildHasData>
              <div
                className={clsx(
                  "min-h-full flex flex-col flex-grow overflow-hidden flex-1",
                  { "bg-gaming-navy": isOnNormalFlow || !isOnPreferenceFlow || !isOnBuildFlow },
                  { "bg-[radial-gradient(73.61%_80.84%_at_23.17%_18.42%,rgba(113,180,230,0.40)_0%,rgba(76,72,143,0.22)_27.09%,rgba(37,35,99,0.40)_45.19%,rgba(37,35,99,0.40)_65.68%,rgba(0,0,0,0.40)_89.96%),linear-gradient(180deg,#030009_0%,#0C0021_30.73%,#0C0021_69.27%,#030008_98.96%)]": isOnPreferenceFlow },
                  { "bg-gaming-navy": isOnBuildFlow },
                )}
              >
                <Outlet />
              </div>
            </ValidateBuildHasData>
          </div>
        </div>
      </div>
    </BuildPCContextWrapper>
  )
}

const buildRoutes = [
  { path: "/build-pc/*" }
]

interface IValidateBuildHasData {
  children: React.ReactNode;
}

function ValidateBuildHasData({ children }: IValidateBuildHasData) {
  const location = useLocation()
  const isOnBuildRoutes = matchRoutes(buildRoutes, location)
  const { preferences, resetApp } = useBuildPCContext();

  useEffect(() => {
    if (isOnBuildRoutes) {
      if (preferences.game_type_title.length === 0 && !preferences.gaming_fps && !preferences.gaming_resolution) {
        resetApp();
      }
    }
  }, [isOnBuildRoutes])

  return children
}

function RetailerIcon() {
  const { resetApp } = useBuildPCContext();
  return (
    <div onClick={() => resetApp()} className="py-3 px-5 min-w-[212px] flex justify-center bg-intel-e-gray-s1">
      <RetailerLogo />
    </div>
  )
}
