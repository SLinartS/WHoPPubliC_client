import './style.scss';

import { observer } from 'mobx-react-lite';
import { FC } from 'react';

import { TMouseButtonEventHandler } from '../../../types/form/type';
import Button from '../button/Button';

interface IWindowHeaderProps {
  classes?: string;
  text: string;
  textSaveButton?: string;
  textCloseButton?: string;
  saveEvent: TMouseButtonEventHandler;
  closeEvent: TMouseButtonEventHandler;
}

const WindowHeader: FC<IWindowHeaderProps> = observer(
  ({
    classes,
    text,
    textSaveButton = 'Сохранить',
    textCloseButton = 'Отмена',
    saveEvent,
    closeEvent,
  }) => (
    <div className={`window-header ${classes}`}>
      <h3 className='window-header__title'>{text}</h3>
      <Button
        additionalСlasses='button--window-header'
        text={textSaveButton}
        clickHandler={saveEvent}
      />
      <Button
        additionalСlasses='button--window-header'
        text={textCloseButton}
        clickHandler={closeEvent}
      />
    </div>
  ),
);

export default WindowHeader;
