import './style.scss';

import { observer } from 'mobx-react-lite';
import { FC } from 'react';

import { TMouseButtonEvent } from '../../../types/form/type';
import Button from '../button/Button';

interface IWindowHeaderProps {
  classes?: string;
  text: string;
  saveEvent: TMouseButtonEvent;
  closeEvent: TMouseButtonEvent;
}

const WindowHeader: FC<IWindowHeaderProps> = observer(
  ({ classes, text, saveEvent, closeEvent }) => (
    <div className={`window-header ${classes}`}>
      <h3 className='window-header__title'>{text}</h3>
      <Button
        additionalСlasses='button--window-header'
        text='Сохранить'
        clickEvent={saveEvent}
      />
      <Button
        additionalСlasses='button--window-header'
        text='Отмена'
        clickEvent={closeEvent}
      />
    </div>
  ),
);

export default WindowHeader;
