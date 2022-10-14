import { createBrowserRouter } from 'react-router-dom';
import Main from './components/pages/Main';
import ErrorPage from './components/layout/errorPage/ErrorPage';
import Layout from './components/layout/Layout';

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
		],
	},
]);

export default router;
