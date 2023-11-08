import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import RouteNames from './lib/utils/routenames';

function App() {
  const router = createBrowserRouter([
    {
      path: RouteNames.home,
      element: '',
      children: [],
    },
  ]);

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
