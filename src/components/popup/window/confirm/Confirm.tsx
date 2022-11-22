import { observer } from 'mobx-react-lite';
import { FC } from 'react';

import { useRootStore } from '../../../../utils/RootStoreProvider/useRootStore';
import Button from '../../../blocks/button/Button';
import WindowHeader from '../../../blocks/windowHeader/WindowHeader';

const WindowConfirm: FC = observer(() => {
  const { storePopup } = useRootStore();
  return (
    <div className='popup popup--window popup--window-confirm'>
      <WindowHeader title={storePopup.windows.confirm.setting.title} />
      <div className='popup--window-confirm__block'>
        <Button
          classes='button__confirm'
          text='Да'
          clickHandler={storePopup.windows.confirm.setting.firstButtonEvent}
        />
        <Button
          classes='button__confirm'
          text='Нет'
          clickHandler={storePopup.windows.confirm.setting.secondButtonEvent}
        />
      </div>
    </div>
  );
});

export default WindowConfirm;
