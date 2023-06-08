import React from 'react';
import { Outlet } from 'react-router-dom';

import ResponsiveAppBar from './components/Navbar';

export default function App() {
  const location = window.location.href.split('/');

  return (
    <div className="App">
      { location[location.length - 1] !== 'signup' ? <ResponsiveAppBar /> : ''}
      <Outlet />
    </div>
  );
}
