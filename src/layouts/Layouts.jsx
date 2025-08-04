import Login from '../components/login'

import { Outlet } from 'react-router-dom';
export default function Layouts() {
  return (
    <div className='bg-gray-200 min-h-screen flex items-center justify-center'>
      <h1 >
        <Outlet />
      </h1>
    </div>
  )
}