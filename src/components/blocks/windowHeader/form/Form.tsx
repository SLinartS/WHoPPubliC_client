import { observer } from 'mobx-react-lite';
import { FC } from 'react';

import { TMouseButtonEventHandler } from '../../../../types/form/type';
import Button from '../../button/Button';
import WindowHeader from '../WindowHeader';

interface IWindowHeaderFormProps {
  title: string;
  textSaveButton?: string;
  textCloseButton?: string;
  saveEvent: TMouseButtonEventHandler;
  closeEvent: TMouseButtonEventHandler;
}

const WindowHeaderForm: FC<IWindowHeaderFormProps> = observer(
  ({
    textSaveButton = 'Сохранить',
    textCloseButton = 'Отмена',
    saveEvent,
    closeEvent,
    title,
  }) => {
    return (
      <WindowHeader
        title={title}
        classes='window-header--form'
      >
        <Button
          classes='button--window-header'
          text={textSaveButton}
          clickHandler={saveEvent}
        />
        <Button
          classes='button--window-header'
          text={textCloseButton}
          clickHandler={closeEvent}
        />
      </WindowHeader>
    );
  },
);

export default WindowHeaderForm;
