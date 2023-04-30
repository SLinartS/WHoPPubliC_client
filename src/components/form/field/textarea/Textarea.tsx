import { TChangeFieldEvent } from '@gtypes/form/type';
import { observer } from 'mobx-react-lite';

interface IFormFieldTextareaProps<T, I> {
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
  errors?: string[];
}

const FormFieldTextarea = <T, I>({
  fieldName,
  readonly,
  changeHandler,
  value,
  placeholder,
  classes,
  onFocusHandler,
  additionalInformation,
  errors,
}: IFormFieldTextareaProps<T, I>) => {
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

  function isError(): boolean {
    if (errors && errors.length && errors[0] && errors[0].length) {
      return true;
    }
    return false;
  }

  return (
    <textarea
      readOnly={readonly}
      value={value}
      className={`form-layout__textarea ${classes} ${
        value ? 'form-layout__textarea--active' : ''
      }
        ${isError() ? 'form-layout__textarea--error' : ''}
      `}
      onChange={changeFieldHandler}
      placeholder={placeholder}
      onFocus={onFocus}
      onBlur={onBlur}
      rows={10}
    />
  );
};

export default observer(FormFieldTextarea);
