import { useRootStore } from '@helpers/RootStoreProvider/useRootStore';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';

import WindowConfirmTemplate from '../template/Template';

const WindowConfirmDeleteAccount: FC = () => {
  const { storeAccount, storeTable, storePopup } = useRootStore();

  function firstButtonClickHandler() {
    const settings = storePopup.windows.confirm.getSetting();
    storeAccount.action.destroy(settings.itemId, () => {
      storeAccount.action.fetch(() => {
        storeTable.selectedItem.setItemId('accounts', 'accounts', 0);
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

export default observer(WindowConfirmDeleteAccount);
