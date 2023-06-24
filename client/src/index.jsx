import { ThemeProvider } from '@mui/material';
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
import ToastContextProvider from './components/common/context/ToastContextProvider';
import About from './pages/About';
import DesignLibrary from './pages/DesignLibrary';
import Home from './pages/Home';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Profile from './pages/Profile';
import SignupFlow from './pages/SignupFlow';
import rootReducer from './reducers';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import theme from './theme';

const router = createBrowserRouter([
  {
    path: '/app',
    element: <App />,
    children: [
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
    ],
  },
  {
    path: '/',
    element: <Landing />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/lib',
    element: <DesignLibrary />,
  },
  {
    path: '/signup',
    element: <SignupFlow />,
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
        <ToastContextProvider>
          <ThemeProvider theme={theme}>
            <RouterProvider router={router} />
          </ThemeProvider>
        </ToastContextProvider>
      </LocalizationProvider>
    </Provider>
  </React.StrictMode>,
);
