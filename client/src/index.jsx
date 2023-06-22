import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { configureStore } from '@reduxjs/toolkit';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import thunk from 'redux-thunk';

import App from './App';
import About from './pages/About';
import DesignLibrary from './pages/DesignLibrary';
import Home from './pages/Home';
import Landing from './pages/Landing';
import Profile from './pages/Profile';
import SignupFlow from './pages/SignupFlow';
import rootReducer from './reducers';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <Landing />,
      },
      {
        path: 'home',
        element: <Home />,
      },
      {
        path: 'about',
        element: <About />,
      },
      {
        path: 'profile',
        element: <Profile />,
      },
      {
        path: 'signup',
        element: <SignupFlow />,
      },
      {
        path: 'lib',
        element: <DesignLibrary />,
      },
    ],
  },

]);

// eslint-disable-next-line import/prefer-default-export
export const store = configureStore({
  reducer: rootReducer,
  middleware: (gDM) => gDM().concat(thunk),
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <RouterProvider router={router} />
      </LocalizationProvider>
    </Provider>
  </React.StrictMode>,
);
