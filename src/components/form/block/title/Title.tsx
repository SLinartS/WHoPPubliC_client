import { observer } from 'mobx-react-lite';
import { FC } from 'react';

interface IPropertiesBlockTitleProps {
  classes?: string;
  text: string;
}

const FormBlockTitle: FC<IPropertiesBlockTitleProps> = ({ classes, text }) => (
  <p className={`form-layout__title form-layout__title--${classes}`}>{text}</p>
);

export default observer(FormBlockTitle);
