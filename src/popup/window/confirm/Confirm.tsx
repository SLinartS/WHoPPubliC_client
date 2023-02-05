import '../style.scss';
import '../../style.scss';

import { useRootStore } from '@helpers/RootStoreProvider/useRootStore';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';

import WindowConfirmDeleteAccount from './deleteAccount/DeleteAccount';
import WindowConfirmDeleteProduct from './deleteProduct/DeleteProduct';
import WindowConfirmDeleteRelatedProduct from './deleteTask/deleteRelatedProduct/DeleteRelatedProduct';
import WindowConfirmDeleteTask from './deleteTask/DeleteTask';

const WindowConfirm: FC = () => {
  const { storePopup } = useRootStore();

  function displayWindow() {
    const settings = storePopup.windows.confirm.getSetting();
    switch (settings.variant) {
      case 'deleteTask':
        return <WindowConfirmDeleteTask />;
      case 'deleteRelatedProducts':
        return <WindowConfirmDeleteRelatedProduct />;
      case 'deleteProduct':
        return <WindowConfirmDeleteProduct />;
      case 'deleteAccount':
        return <WindowConfirmDeleteAccount />;
      default:
        return null;
    }
  }

  return displayWindow();
};

export default observer(WindowConfirm);
