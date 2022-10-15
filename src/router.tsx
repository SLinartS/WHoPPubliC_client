import { createBrowserRouter } from 'react-router-dom';
import Main from './components/pages/Main';
import ErrorPage from './components/layout/errorPage/ErrorPage';
import Layout from './components/layout/Layout';
import Login from './components/pages/Login';
import Map from './components/pages/map/Map';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
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
				path: 'map',
				element: <Map />,
			},
		],
	},
]);

export default router;
