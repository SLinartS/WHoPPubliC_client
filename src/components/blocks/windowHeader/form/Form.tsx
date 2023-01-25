import { observer } from 'mobx-react-lite';
import { FC } from 'react';

import { TMouseImgEventHandler } from '../../../../types/form/type';
import IconButton from '../iconButton/IconButton';
import WindowHeader from '../WindowHeader';

interface IWindowHeaderFormProps {
  title: string;
  backEventHandler?: TMouseImgEventHandler;
  resetEventHandler?: TMouseImgEventHandler;
  saveEventHandler?: TMouseImgEventHandler;
  closeEventHandler: TMouseImgEventHandler;
}

const WindowHeaderForm: FC<IWindowHeaderFormProps> = ({
  title,
  backEventHandler,
  resetEventHandler,
  saveEventHandler,
  closeEventHandler,
}) => {
  return (
    <WindowHeader
      title={title}
      classes='window-header--form'
    >
      <div className='window-header__button-block'>
        {resetEventHandler && (
          <IconButton
            iconType='reset'
            eventHandler={resetEventHandler}
          />
        )}
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
};

export default observer(WindowHeaderForm);
