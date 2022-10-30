import { observer } from 'mobx-react-lite';
import { FC } from 'react';
import { PropertiesBlockLayoutProps } from './type';
import './style.scss';

const FormLayout: FC<PropertiesBlockLayoutProps> = observer(
  ({ additionalСlasses, children }) => (
    <div className={`properties-block ${additionalСlasses}`}>{children}</div>
  ),
);

export default FormLayout;
