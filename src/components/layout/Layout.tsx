import React from 'react';
import Header from './header/Header';
import { Outlet } from 'react-router-dom';
import AddProduct from '../pages/products/AddProduct';
import { useRootStore } from '../../utils/RootStoreProvider/useRootStore';
import { observer } from 'mobx-react-lite';

const Layout = observer(() => {
	const { popUpControlStore } = useRootStore();

	return (
		<>
			<Header />
			<Outlet />
			{popUpControlStore.addProduct ? <AddProduct /> : ''}
		</>
	);
});

export default Layout;
