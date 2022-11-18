import { observer } from 'mobx-react-lite';
import { FC } from 'react';

import { useRootStore } from '../../../../utils/RootStoreProvider/useRootStore';
import Button from '../../../blocks/button/Button';
import WindowHeader from '../../../blocks/windowHeader/WindowHeader';

const WindowConfirm: FC = observer(() => {
  const { storeWindow } = useRootStore();
  return (
    <div className='popup popup--window popup--window-confirm'>
      <WindowHeader title={storeWindow.confirm.setting.title} />
      <div className='popup--window-confirm__block'>
        <Button
          classes='button__confirm'
          text='Да'
          clickHandler={storeWindow.confirm.setting.firstButtonEvent}
        />
        <Button
          classes='button__confirm'
          text='Нет'
          clickHandler={storeWindow.confirm.setting.secondButtonEvent}
        />
      </div>
    </div>
  );
});

export default WindowConfirm;
