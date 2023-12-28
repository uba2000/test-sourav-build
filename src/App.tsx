import { RouterProvider } from 'react-router-dom';
import useRouterRoutes from './lib/hooks/useRouterRoutes';
import React from 'react';
import SuspenseScreen from './components/SuspenseScreen/SuspenseScreen';

// App.tsx
function App() {
  const router = useRouterRoutes()

  return (
    <React.Suspense fallback={<SuspenseScreen />}>
      <div className="App">
        <RouterProvider router={router} />
      </div>
    </React.Suspense>
  );
}

export default App;
