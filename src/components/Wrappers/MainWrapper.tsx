import { Outlet } from 'react-router-dom';


export default function MainWrapper() {
  return (
    <div className="min-h-screen flex flex-col">
      <Outlet />
    </div>
  )
}
