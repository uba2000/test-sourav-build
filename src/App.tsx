import { RouterProvider } from 'react-router-dom';
import useRouterRoutes from './lib/hooks/useRouterRoutes';
import React from 'react';
import SuspenseScreen from './components/SuspenseScreen/SuspenseScreen';
import { use100vh } from './components/Widgets/Div100vh';

// App.tsx
function App() {
  const router = useRouterRoutes()
  const height = use100vh();

  return (
    <React.Suspense fallback={<SuspenseScreen />}>
      <div className="App">
        <div className='overflow-y-auto scroll-smooth flex flex-col' id="app_container" style={{ minHeight: height as string | number }}>
          <RouterProvider router={router} />
        </div>
      </div>
    </React.Suspense>
  );
}

export default App;
