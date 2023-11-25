import { createBrowserRouter } from 'react-router-dom';
import MainWrapper from '../../components/Wrappers/MainWrapper';
import LandingPage from '../../pages/landing/LandingPage';
import RouteNames from '../utils/routenames';
import BuildPreference from '../../pages/build-pc/preference/BuildPreference';
import BuildScratch from '../../pages/build-pc/build-scratch/BuildScratch';
import StartFromScratch from '../../pages/build-pc/build-scratch/StartFromScratch';
import ChooseComponents from '../../pages/build-pc/build-scratch/ChooseComponents/ChooseComponents';
import CompareComponents from '../../pages/build-pc/build-scratch/CompareComponents/CompareComponents';
import MyBuild from '../../pages/build-pc/build-scratch/MyBuild/MyBuild';

function useRouterRoutes() {
  const router = createBrowserRouter([
    {
      path: RouteNames.home,
      element: <MainWrapper />,
      children: [
        {
          index: true,
          element: <LandingPage />,
        },
        {
          path: RouteNames.buildPreferenceIndex,
          element: <BuildPreference />
        },
        {
          path: RouteNames.buildPC,
          element: <BuildScratch />
        },
        {
          path: RouteNames.buildPCMyBuild,
          element: <MyBuild />
        },
        {
          path: RouteNames.buildPCFromScratch,
          element: <StartFromScratch />
        },
        {
          path: `${RouteNames.buildChooseComponent}/:category_slug`,
          element: <ChooseComponents />
        },
        {
          path: `${RouteNames.buildCompareComponent}/:category_slug`,
          element: <CompareComponents />
        },
      ],
    },
  ]);

  return router
}

export default useRouterRoutes