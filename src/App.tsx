// import { RouterProvider } from 'react-router-dom';
import { Routes, Route, BrowserRouter, } from "react-router-dom";
import useRouterRoutes, { Build_Routes } from './lib/hooks/useRouterRoutes';
import React from 'react';
import SuspenseScreen from './components/SuspenseScreen/SuspenseScreen';
import RouteNames from "./lib/utils/routenames";

import BuildScratch from "./pages/build-pc/build-scratch/BuildScratch";
import BuildLayout from "./pages/build-pc/build-scratch/components/BuildLayout";
import LandingPage from "./pages/landing/LandingPage";
import BuildPreference from "./pages/build-pc/preference/BuildPreference";
import MainWrapper from "./components/Wrappers/MainWrapper";
import _ from "lodash";

// App.tsx
function App() {
  const router = useRouterRoutes()
  console.log('v1.0.0');

  return (
    <React.Suspense fallback={<SuspenseScreen />}>
      {/* <RouterProvider router={router} /> */}

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainWrapper />}>
            <Route index element={<LandingPage />} />
            <Route path={RouteNames.buildPreferenceIndex} element={<BuildPreference />} />
            {/* <Route path="dashboard" element={<Dashboard />} /> */}

            {/* <Route path="*" element={<NoMatch />} /> */}
            <Route path={RouteNames.buildPC} element={<BuildLayout />}>
              <Route index element={<BuildScratch />} />

              {Build_Routes.map((route) => (
                <Route key={_.uniqueId()} {...route} />
              ))}
            </Route>
          </Route>

        </Routes>
      </BrowserRouter>
    </React.Suspense>
  );
}

export default App;
