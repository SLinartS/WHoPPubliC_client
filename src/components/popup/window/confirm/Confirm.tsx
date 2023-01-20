import { observer } from 'mobx-react-lite';
import { FC } from 'react';

import { useRootStore } from '../../../../utils/RootStoreProvider/useRootStore';
import WindowConfirmDeleteProduct from './deleteProduct/DeleteProduct';
import WindowConfirmDeleteRelatedProduct from './deleteTask/deleteRelatedProduct/DeleteRelatedProduct';
import WindowConfirmDeleteTask from './deleteTask/DeleteTask';

const WindowConfirm: FC = observer(() => {
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
      default:
        return null;
    }
  }

  return displayWindow();
});

export default WindowConfirm;
