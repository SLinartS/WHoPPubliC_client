import { TChangeFieldEvent } from '@gtypes/form/type';
import { observer } from 'mobx-react-lite';

interface IFormFieldInputProps<T> {
  fieldName: keyof T;
  changeHandler: (newValue: string, fieldName: keyof T) => void;
  value: string;
  readonly: boolean;
  placeholder?: string;
  classes?: string;
}

const FormFieldInput = <T extends unknown>({
  fieldName,
  readonly,
  changeHandler,
  value,
  placeholder,
  classes,
}: IFormFieldInputProps<T>) => {
  function changeFieldHandler(e: TChangeFieldEvent) {
    changeHandler(e.target.value, fieldName);
  }

  return (
    <input
      readOnly={readonly}
      value={value}
      className={`form-layout__input ${classes} ${
        value ? 'form-layout__input--active' : ''
      }`}
      onChange={changeFieldHandler}
      placeholder={placeholder}
    />
  );
};

export default observer(FormFieldInput);
