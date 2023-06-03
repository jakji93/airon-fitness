import React from 'react';
import { Outlet } from 'react-router-dom';

import ResponsiveAppBar from './components/Navbar';

export default function App() {
  return (
    <div className="App">
      <ResponsiveAppBar />
      <Outlet />
    </div>
  );
}
