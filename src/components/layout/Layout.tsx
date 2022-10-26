import Header from './header/Header';

import { useRootStore } from '../../utils/RootStoreProvider/useRootStore';
import { observer } from 'mobx-react-lite';
import { Outlet } from 'react-router-dom';

import AddProduct from '../popup/AddProduct';
import AddTask from '../popup/AddTask';

const Layout = observer(() => {
	const { popUpControlStore } = useRootStore();

	return (
		<>
			<Header />
			<Outlet />
			{popUpControlStore.addProductStatus ? <AddProduct /> : ''}
			{popUpControlStore.addAcceptanceTaskStatus ? <AddTask /> : ''}
		</>
	);
});

export default Layout;