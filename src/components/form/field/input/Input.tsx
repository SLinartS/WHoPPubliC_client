import { TChangeFieldEvent } from '@gtypes/form/type';
import { observer } from 'mobx-react-lite';
import { HTMLInputTypeAttribute } from 'react';

interface IFormFieldInputProps<T, I> {
  fieldName: keyof T;
  changeHandler: (newValue: string, fieldName: keyof T) => void;
  value: string;
  readonly: boolean;
  placeholder?: string;
  classes?: string;
  onFocusHandler?: (
    status: boolean,
    additionalInformation: I,
    isHaveValue: boolean,
  ) => void;
  additionalInformation?: I;
  inputType?: HTMLInputTypeAttribute;
}

const FormFieldInput = <T, I>({
  fieldName,
  readonly,
  changeHandler,
  value,
  placeholder,
  classes,
  onFocusHandler,
  additionalInformation,
  inputType = 'text',
}: IFormFieldInputProps<T, I>) => {
  function changeFieldHandler(e: TChangeFieldEvent) {
    changeHandler(e.target.value, fieldName);
  }

  function onFocus() {
    if (onFocusHandler && additionalInformation) {
      onFocusHandler(true, additionalInformation, Boolean(value));
    }
  }
  function onBlur() {
    if (onFocusHandler && additionalInformation) {
      onFocusHandler(false, additionalInformation, Boolean(value));
    }
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
      onFocus={onFocus}
      onBlur={onBlur}
      type={inputType}
    />
  );
};

export default observer(FormFieldInput);
