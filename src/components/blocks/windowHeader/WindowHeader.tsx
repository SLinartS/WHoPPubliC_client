import { observer } from 'mobx-react-lite';
import { FC } from 'react';
import { IWindowHeaderProps } from './type';
import './style.scss';

const WindowHeader: FC<IWindowHeaderProps> = observer(
  ({ classes, text, children }) => (
    <div className={`window-header ${classes}`}>
      <h3 className='window-header__title'>{text}</h3>
      {children}
    </div>
  ),
);

export default WindowHeader;
