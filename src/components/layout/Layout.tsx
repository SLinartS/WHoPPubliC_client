import { observer } from 'mobx-react-lite';
import { Outlet } from 'react-router-dom';
import Header from './header/Header';

import { useRootStore } from '../../utils/RootStoreProvider/useRootStore';

import AddProduct from '../popup/addProduct/AddProduct';
import AddTask from '../popup/addTask/AddTask';
import SelectMap from '../popup/selectMap/SelectMap';

const Layout = observer(() => {
  const { popupStore } = useRootStore();

  return (
    <>
      <Header />
      <Outlet />
      {popupStore.addProductStatus ? <AddProduct /> : ''}
      {popupStore.addTaskStatus ? <AddTask /> : ''}
      {popupStore.selectMapStatus ? <SelectMap /> : ''}
    </>
  );
});

export default Layout;
