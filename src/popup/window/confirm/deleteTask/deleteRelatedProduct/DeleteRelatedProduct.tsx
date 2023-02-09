import { useRootStore } from '@helpers/RootStoreProvider/useRootStore';
import { TTaskType } from '@store/type';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';

import WindowConfirmTemplate from '../../template/Template';

const WindowConfirmDeleteRelatedProduct: FC = () => {
  const { storeTable, storeTask, storePopup } = useRootStore();

  function deleteTask(isDeleteProduct: boolean) {
    const settings = storePopup.windows.confirm.getSetting();
    storeTask.action.destroy(settings.itemId, isDeleteProduct, () => {
      storePopup.status.hide('windowConfirm', () => {
        storeTask.action.fetch(settings.itemName as TTaskType, () => {
          storeTable.selectedItem.setItemId('tasks', settings.itemName, 0);
        });
      });
    });
  }

  function firstButtonClickHandler() {
    deleteTask(true);
  }

  function secondButtonClickHandler() {
    deleteTask(false);
  }

  return (
    <WindowConfirmTemplate
      text={storePopup.windows.confirm.getSetting().text}
      firstButtonClickHandler={firstButtonClickHandler}
      secondButtonClickHandler={secondButtonClickHandler}
    />
  );
};

export default observer(WindowConfirmDeleteRelatedProduct);
