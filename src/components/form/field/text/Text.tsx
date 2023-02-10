import { observer } from 'mobx-react-lite';
import { FC } from 'react';

interface IFormFieldTextProps {
  value: string;
}

const FormFieldText: FC<IFormFieldTextProps> = ({ value }) => {
  return <p className='form-layout__text'>{value}</p>;
};

export default observer(FormFieldText);
