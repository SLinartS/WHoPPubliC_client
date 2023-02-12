import { TChangeFieldEvent } from '@gtypes/form/type';
import { observer } from 'mobx-react-lite';

interface IFormFieldDatetimeProps<T, K> {
  valueDate: string;
  valueTime: string;
  changeDateHandler: (newValue: string, fieldName: keyof T) => void;
  changeTimeHandler: (newValue: string, fieldName: keyof K) => void;
  fieldNameDate: keyof T;
  fieldNameTime: keyof K;
  readonly: boolean;
  placeholderDate?: string;
  placeholderTime?: string;
}

const FormFieldDatetime = <T, K extends unknown>({
  valueDate,
  valueTime,
  changeDateHandler,
  changeTimeHandler,
  fieldNameDate,
  fieldNameTime,
  placeholderDate,
  placeholderTime,
  readonly,
}: IFormFieldDatetimeProps<T, K>) => {
  function changeDateFieldHandler(e: TChangeFieldEvent) {
    changeDateHandler(e.target.value, fieldNameDate);
  }

  function changeTimeFieldHandler(e: TChangeFieldEvent) {
    changeTimeHandler(e.target.value, fieldNameTime);
  }

  return (
    <div className='form-layout__datetime '>
      <input
        readOnly={readonly}
        value={valueDate}
        className={`form-layout__input ${
          valueDate ? 'form-layout__input--active' : ''
        }`}
        onChange={changeDateFieldHandler}
        placeholder={placeholderDate}
      />
      <input
        readOnly={readonly}
        value={valueTime}
        className={`form-layout__input ${
          valueTime ? 'form-layout__input--active' : ''
        }`}
        onChange={changeTimeFieldHandler}
        placeholder={placeholderTime}
      />
    </div>
  );
};

export default observer(FormFieldDatetime);
