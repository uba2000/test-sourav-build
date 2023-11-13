import { RouterProvider } from 'react-router-dom';
import useRouterRoutes from './hooks/useRouterRoutes';

// App.tsx
function App() {
  const router = useRouterRoutes()

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
