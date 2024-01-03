import { RouterProvider } from 'react-router-dom';
import useRouterRoutes from './lib/hooks/useRouterRoutes';
import React from 'react';
import SuspenseScreen from './components/SuspenseScreen/SuspenseScreen';
import { use100vh } from './components/Widgets/Div100vh';
import RetailerLogo from './assets/dummy-retailer-logo.svg?react'

// App.tsx
function App() {
  const router = useRouterRoutes()
  const height = use100vh();
  console.log('v1.0.0');

  return (
    <React.Suspense fallback={<SuspenseScreen />}>
      <div className="App">
        <div className='pb-[2px]'>
          <div className='flex mb-[2px]'>
            <div className="py-3 px-5 min-w-[212px] flex justify-center bg-intel-e-gray-s1">
              <RetailerLogo />
            </div>
            <div className="flex-1 bg-[#808080]" />
          </div>
          {/*  */}
          <div className="bg-[#AEAEAE] h-[30px]" />
        </div>
        <div style={{ height: height ? height - 94 as string | number : '100vh' }} className='flex flex-col'>
          <div className='overflow-y-auto scroll-smooth flex flex-col max-h-full flex-1' id="app_container">
            <RouterProvider router={router} />
          </div>
        </div>
      </div>
    </React.Suspense>
  );
}

export default App;
