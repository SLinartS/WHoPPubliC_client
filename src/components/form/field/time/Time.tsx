import { TChangeFieldEvent } from '@gtypes/form/type';
import { observer } from 'mobx-react-lite';

interface IFormFieldTimeProps<T, I> {
  value: string;
  changeHandler: (
    newValue: string,
    fieldName: keyof T,
    additionalInformation: I,
  ) => void;
  fieldName: keyof T;
  additionalInformation: I;
  readonly: boolean;
  placeholder?: string;
}

const FormFieldTime = <T, I extends unknown>({
  value,
  changeHandler,
  fieldName,
  additionalInformation,
  placeholder,
  readonly,
}: IFormFieldTimeProps<T, I>) => {
  function changeFieldHandler(e: TChangeFieldEvent) {
    changeHandler(e.target.value, fieldName, additionalInformation);
  }

  return (
    <div className='form-layout__time'>
      <input
        readOnly={readonly}
        value={value}
        className={`form-layout__input ${
          value ? 'form-layout__input--active' : ''
        }`}
        onChange={changeFieldHandler}
        placeholder={placeholder}
      />
    </div>
  );
};

export default observer(FormFieldTime);
