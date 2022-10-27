import { createBrowserRouter } from 'react-router-dom';
import Main from './components/pages/main/Main';
import ErrorPage from './components/layout/errorPage/ErrorPage';
import Layout from './components/layout/Layout';
import Login from './components/pages/login/Login';
import Map from './components/pages/map/Map';
import Tasks from './components/pages/tasks/Tasks';
import Products from './components/pages/products/Products';

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
			{
				path: 'tasks',
				element: <Tasks />,
			},
			{
				path: 'products',
				element: <Products />,
			},
		],
	},
]);

export default router;
