import { observer } from 'mobx-react-lite';
import { FC, ReactNode } from 'react';

interface PropertiesBlockLayoutProps {
  classes?: string;
  children: ReactNode;
}

const FormLayout: FC<PropertiesBlockLayoutProps> = observer(
  ({ classes, children }) => (
    <div
      className={`form-block ${classes}`}
      data-testid='form-layout-div'
    >
      {children}
    </div>
  ),
);

export default FormLayout;
