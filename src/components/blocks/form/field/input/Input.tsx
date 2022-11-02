import { observer } from 'mobx-react-lite';
import { ChangeEventHandler, FC } from 'react';

interface IFormFieldInputProps {
  additionalСlasses?: string;
  value: string;
  changeEvent: ChangeEventHandler<HTMLInputElement | HTMLSelectElement>;
}

const FormFieldInput: FC<IFormFieldInputProps> = observer(
  ({ additionalСlasses, value, changeEvent }) => (
    <input
      value={value}
      className={`form-block__input ${additionalСlasses}`}
      onChange={changeEvent}
    />
  ),
);

export default FormFieldInput;
