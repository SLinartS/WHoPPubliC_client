import { observer } from 'mobx-react-lite';
import { FC } from 'react';

interface IPropertiesBlockTitleProps {
  additionalСlasses?: string;
  text: string;
}

const FormTitle: FC<IPropertiesBlockTitleProps> = observer(
  ({ additionalСlasses, text }) => (
    <p className={`form-block__title ${additionalСlasses}`}>{text}</p>
  ),
);

export default FormTitle;
