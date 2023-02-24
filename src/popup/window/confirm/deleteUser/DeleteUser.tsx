import { useRootStore } from '@helpers/RootStoreProvider/useRootStore';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';

import WindowConfirmTemplate from '../template/Template';

const WindowConfirmDeleteUser: FC = () => {
  const { storeUser, storeTable, storePopup } = useRootStore();

  function firstButtonClickHandler() {
    const settings = storePopup.windows.confirm.getSetting();
    storeUser.action.destroy(settings.itemId, () => {
      storeUser.action.fetch('', () => {
        storeTable.selectedItem.setItemId('users', 'users', 0);
      });
      storePopup.status.hide('windowConfirm');
    });
  }

  function secondButtonClickHandler() {
    storePopup.status.hide('windowConfirm');
  }

  return (
    <WindowConfirmTemplate
      text={storePopup.windows.confirm.getSetting().text}
      firstButtonClickHandler={firstButtonClickHandler}
      secondButtonClickHandler={secondButtonClickHandler}
    />
  );
};

export default observer(WindowConfirmDeleteUser);
