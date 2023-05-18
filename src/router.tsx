import AxiosInterceptor from '@helpers/AxiosInterceptor/AxiosInterceptor';
import { createBrowserRouter } from 'react-router-dom';

import ErrorPage from './layout/errorPage/ErrorPage';
import Layout from './layout/Layout';
import Login from './pages/login/Login';
import Main from './pages/main/Main';
import Map from './pages/map/Map';
import Points from './pages/points/Points';
import Products from './pages/products/Products';
import ReportPage from './pages/report/ReportPage';
import Tasks from './pages/tasks/Tasks';
import Users from './pages/users/Users';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <AxiosInterceptor>
        <Layout />
      </AxiosInterceptor>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Main />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'points',
        element: <Points />,
      },
      {
        path: 'map',
        element: <Map />,
      },
      {
        path: 'tasks',
        element: <Tasks />,
      },
      {
        path: 'products',
        element: <Products />,
      },
      {
        path: 'users',
        element: <Users />,
      },
      {
        path: 'reports',
        element: <ReportPage />,
      },
    ],
  },
]);

export default router;
