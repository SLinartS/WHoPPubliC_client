import { observer } from 'mobx-react-lite';
import { FC } from 'react';

interface IPropertiesBlockTitleProps {
  classes?: string;
  text: string;
}

const FormTitle: FC<IPropertiesBlockTitleProps> = observer(
  ({ classes, text }) => (
    <p className={`form-block__title ${classes}`}>{text}</p>
  ),
);

export default FormTitle;
