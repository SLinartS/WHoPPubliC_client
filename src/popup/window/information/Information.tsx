import '../style.scss';
import '../../style.scss';

import Button from '@components/button/Button';
import WindowHeader from '@components/windowHeader/WindowHeader';
import { useRootStore } from '@helpers/RootStoreProvider/useRootStore';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';

const WindowInformation: FC = () => {
  const { storePopup } = useRootStore();

  function closeWindowHandler() {
    storePopup.status.hide('windowInformation');
    storePopup.status.hide('windowConfirm');
  }

  return (
    <>
      <div className='popup-window__background' />
      <div className='popup popup__popup-window popup-window popup-window--information'>
        <WindowHeader title='Ошибка!'>
          <Button
            text='Закрыть'
            clickHandler={closeWindowHandler}
          />
        </WindowHeader>
        <div className='popup-window__block'>
          <p className='popup-window__text'>
            {storePopup.windows.information.setting.text}
          </p>
        </div>
      </div>
    </>
  );
};

export default observer(WindowInformation);
