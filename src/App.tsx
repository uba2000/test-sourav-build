import { RouterProvider } from 'react-router-dom';
import useRouterRoutes from './lib/hooks/useRouterRoutes';
import React from 'react';
import SuspenseScreen from './components/SuspenseScreen/SuspenseScreen';
// import Div100vh from './components/Widgets/Div100vh';

// App.tsx
function App() {
  const router = useRouterRoutes()

  return (
    <React.Suspense fallback={<SuspenseScreen />}>
      <div className='overflow-y-auto scroll-smooth' id="app_container">
        <div className="App">
          <RouterProvider router={router} />
        </div>
      </div>
    </React.Suspense>
  );
}

export default App;
