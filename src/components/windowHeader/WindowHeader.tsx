import './style.scss';

import { observer } from 'mobx-react-lite';
import { FC, ReactNode } from 'react';

interface IWindowHeaderProps {
  classes?: string;
  children?: ReactNode;
  title: string;
}

const WindowHeader: FC<IWindowHeaderProps> = ({ classes, children, title }) => (
  <div className={`window-header ${classes}`}>
    <h3 className='window-header__title'>{title}</h3>
    {children}
  </div>
);

export default observer(WindowHeader);
