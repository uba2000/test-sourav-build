// import { RouterProvider } from 'react-router-dom';
import { RouterProvider, } from "react-router-dom";
import useRouterRoutes from './lib/hooks/useRouterRoutes';
import React from 'react';
import SuspenseScreen from './components/SuspenseScreen/SuspenseScreen';
// import RouteNames from "./lib/utils/routenames";

// import BuildScratch from "./pages/build-pc/build-scratch/BuildScratch";
// import BuildLayout from "./pages/build-pc/build-scratch/components/BuildLayout";
// import LandingPage from "./pages/landing/LandingPage";
// import BuildPreference from "./pages/build-pc/preference/BuildPreference";
// import MainWrapper from "./components/Wrappers/MainWrapper";
// import _ from "lodash";

// App.tsx
function App() {
  const router = useRouterRoutes()
  console.log('Unreal Event: Build Version - v1.1.6');

  return (
    <React.Suspense fallback={<SuspenseScreen />}>
      <RouterProvider router={router} />
    </React.Suspense>
  );
}

export default App;
