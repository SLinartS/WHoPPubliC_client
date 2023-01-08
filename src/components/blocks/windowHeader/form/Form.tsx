import { observer } from 'mobx-react-lite';
import { FC } from 'react';

import { TMouseImgEventHandler } from '../../../../types/form/type';
import IconButton from '../../iconButton/iconButton';
import WindowHeader from '../WindowHeader';

interface IWindowHeaderFormProps {
  title: string;
  backEventHandler?: TMouseImgEventHandler;
  saveEventHandler?: TMouseImgEventHandler;
  closeEventHandler: TMouseImgEventHandler;
}

const WindowHeaderForm: FC<IWindowHeaderFormProps> = observer(
  ({ title, backEventHandler, saveEventHandler, closeEventHandler }) => {
    return (
      <WindowHeader
        title={title}
        classes='window-header--form'
      >
        <div className='window-header__button-block'>
          {backEventHandler && (
            <IconButton
              iconType='back'
              eventHandler={backEventHandler}
            />
          )}
          {saveEventHandler && (
            <IconButton
              iconType='save'
              eventHandler={saveEventHandler}
            />
          )}
          <IconButton
            iconType='close'
            eventHandler={closeEventHandler}
          />
        </div>
      </WindowHeader>
    );
  },
);

export default WindowHeaderForm;
