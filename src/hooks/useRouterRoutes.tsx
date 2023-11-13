import { createBrowserRouter } from 'react-router-dom';
import MainWrapper from '../components/Wrappers/MainWrapper';
import LandingPage from '../pages/landing/LandingPage';
import RouteNames from '../lib/utils/routenames';

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
      ],
    },
  ]);

  return router
}

export default useRouterRoutes