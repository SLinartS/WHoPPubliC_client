import { observer } from 'mobx-react-lite';
import { FC } from 'react';

import { useRootStore } from '../../../../../utils/RootStoreProvider/useRootStore';
import WindowConfirmTemplate from '../template/Template';

const WindowConfirmDeleteProduct: FC = observer(() => {
  const { storeProduct, storeTable, storePopup } = useRootStore();

  function firstButtonClickHandler() {
    const settings = storePopup.windows.confirm.getSetting();
    storeProduct.delete.product(settings.itemId, () => {
      storeProduct.fetch.products(() => {
        storeTable.selectedItem.setItemId('products', 'products', 0);
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
});

export default WindowConfirmDeleteProduct;
