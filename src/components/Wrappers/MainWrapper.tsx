import clsx from 'clsx';
import { Outlet, matchRoutes, useLocation } from 'react-router-dom';
import BuildPCContextWrapper from './BuildPCContextWrapper';

const normalFlow = [{ path: "/" }]
const preferenceFlow = [{ path: "/build-preference" }]
const buildFlow = [{ path: "/build-pc/*" }]

export default function MainWrapper() {
  const location = useLocation()
  const isOnNormalFlow = matchRoutes(normalFlow, location)
  const isOnPreferenceFlow = matchRoutes(preferenceFlow, location)
  const isOnBuildFlow = matchRoutes(buildFlow, location)

  return (
    <BuildPCContextWrapper>
      <div
        className={clsx(
          "min-h-full flex flex-col flex-grow",
          {"bg-gaming-navy": isOnNormalFlow || !isOnPreferenceFlow || !isOnBuildFlow},
          {"bg-[radial-gradient(73.61%_80.84%_at_23.17%_18.42%,rgba(113,180,230,0.40)_0%,rgba(76,72,143,0.22)_27.09%,rgba(37,35,99,0.40)_45.19%,rgba(37,35,99,0.40)_65.68%,rgba(0,0,0,0.40)_89.96%),linear-gradient(180deg,#030009_0%,#0C0021_30.73%,#0C0021_69.27%,#030008_98.96%)]": isOnPreferenceFlow},
          {"bg-[radial-gradient(48.57%_63.05%_at_33.93%_41.56%,_color(display-p3_0.401_0.55_0.6875_/_0.80)_0%,_color(display-p3_0.2967_0.2815_0.5448_/_0.44)_48.44%,_color(display-p3_0.1451_0.1373_0.3725_/_0.00)_87.46%),_linear-gradient(180deg,_color(display-p3_0.011_0.0004_0.0333)_0%,_color(display-p3_0.0392_0_0.1216)_30.73%,_color(display-p3_0.0392_0_0.1216)_69.27%,_color(display-p3_0.0094_0_0.0292)_98.96%)]": isOnBuildFlow},
        )}
      >
        <Outlet />
      </div>
    </BuildPCContextWrapper>
  )
}
