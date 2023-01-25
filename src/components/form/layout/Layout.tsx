import '../style.scss';

import { observer } from 'mobx-react-lite';
import { FC, ReactNode } from 'react';

interface PropertiesBlockLayoutProps {
  classes?: string;
  children: ReactNode;
}

const FormLayout: FC<PropertiesBlockLayoutProps> = ({ classes, children }) => (
  <div
    className={`form-layout form-layout--${classes}`}
    data-testid='form-layout-div'
  >
    {children}
  </div>
);

export default observer(FormLayout);
