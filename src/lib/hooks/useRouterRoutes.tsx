/* eslint-disable react-refresh/only-export-components */
import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import MainWrapper from '../../components/Wrappers/MainWrapper';
import LandingPage from '../../pages/landing/LandingPage';
import RouteNames from '../utils/routenames';
// import BuildPreference from '../../pages/build-pc/preference/BuildPreference';
import BuildScratch from '../../pages/build-pc/build-scratch/BuildScratch';
import ChooseComponents from '../../pages/build-pc/build-scratch/ChooseComponents/ChooseComponents';
import CompareComponents from '../../pages/build-pc/build-scratch/CompareComponents/CompareComponents';
import MyBuild from '../../pages/build-pc/build-scratch/MyBuild/MyBuild';
import PreconfigedSystems from '../../pages/build-pc/preconfiged-systems/PreconfigedSystems';
import ResetSession from '../../pages/reset-session/ResetSession';
import Page3D from '../../pages/page-3d-build';

const BuildPreference = React.lazy(() => import('../../pages/build-pc/preference/BuildPreference'));


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
          path: RouteNames.testStream,
          element: <Page3D />
        },
        {
          path: `${RouteNames.buildChooseComponent}/:category_slug`,
          element: <ChooseComponents />
        },
        {
          path: `${RouteNames.buildCompareComponent}/:category_slug`,
          element: <CompareComponents />
        },
        {
          path: RouteNames.preconfiguredSystemIndex,
          element: <PreconfigedSystems />
        },
        {
          path: RouteNames.resetSessionPage,
          element: <ResetSession />
        },
      ],
    },
  ]);

  return router
}

export default useRouterRoutes