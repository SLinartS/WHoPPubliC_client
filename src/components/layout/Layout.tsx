import { observer } from 'mobx-react-lite';
import { Outlet } from 'react-router-dom';

import { useRootStore } from '../../utils/RootStoreProvider/useRootStore';
import PopupFormProduct from '../popup/form/product/Product';
import PopupFormTask from '../popup/form/task/Task';
import PopupSelectMap from '../popup/select/map/Map';
import PopupSelectPoints from '../popup/select/points/Points';
import Header from './header/Header';

const Layout = observer(() => {
  const { storePopup } = useRootStore();

  return (
    <>
      <Header />
      <Outlet />
      {storePopup.productForm ? <PopupFormProduct /> : ''}
      {storePopup.taskForm ? <PopupFormTask /> : ''}
      {storePopup.selectMap ? <PopupSelectMap /> : ''}
      {storePopup.selectPoints ? <PopupSelectPoints /> : ''}
    </>
  );
});

export default Layout;
