import { useRootStore } from '@helpers/RootStoreProvider/useRootStore';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';

import WindowConfirmTemplate from '../template/Template';

const WindowConfirmDeleteTask: FC = () => {
  const { storePopup } = useRootStore();

  function firstButtonClickHandler() {
    const settings = storePopup.windows.confirm.getSetting();

    storePopup.status.hide('windowConfirm', () => {
      storePopup.status.show('windowConfirm', () => {
        storePopup.windows.confirm.setSetting({
          variant: 'deleteRelatedProducts',
          text: `Удалить связанные с задачей товары?`,
          itemType: settings.itemType,
          itemName: settings.itemName,
          itemId: settings.itemId,
        });
      });
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

export default observer(WindowConfirmDeleteTask);
