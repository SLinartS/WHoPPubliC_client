import './style.scss';

import { observer } from 'mobx-react-lite';
import { FC, ReactNode } from 'react';

interface PropertiesBlockLayoutProps {
  additionalСlasses?: string;
  children: ReactNode;
}

const FormLayout: FC<PropertiesBlockLayoutProps> = observer(
  ({ additionalСlasses, children }) => (
    <div className={`form-block ${additionalСlasses}`}>{children}</div>
  ),
);

export default FormLayout;
