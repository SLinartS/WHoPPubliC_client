import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';

import { RouterProvider } from 'react-router-dom';
import router from './router';

import './styles/style.scss';
import { RootStoreProvider } from './utils/RootStoreProvider/RootStoreProvider';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
	<StrictMode>
		<RootStoreProvider>
			<RouterProvider router={router} />
		</RootStoreProvider>
	</StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
