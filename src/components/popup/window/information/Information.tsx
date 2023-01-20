import { observer } from 'mobx-react-lite';
import { FC } from 'react';

import { useRootStore } from '../../../../utils/RootStoreProvider/useRootStore';
import Button from '../../../blocks/button/Button';
import WindowHeader from '../../../blocks/windowHeader/WindowHeader';

const WindowInformation: FC = observer(() => {
  const { storePopup } = useRootStore();

  function closeWindowHandler() {
    storePopup.status.hide('windowInformation');
    storePopup.status.hide('windowConfirm');
  }

  return (
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
  );
});

export default WindowInformation;
