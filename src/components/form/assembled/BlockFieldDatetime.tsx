import { camelToKebab } from '@utils/stringStyleConvert/camelToKebab';
import { observer } from 'mobx-react-lite';

import FormBlock from '../block/Block';
import FormFieldDatetime from '../field/datetime/Datetime';
import FormField from '../field/Field';

interface IAssembledBlockFieldDatetimeProps<T, K> {
  valueDate: string;
  valueTime: string;
  errorsDate: string[];
  errorsTime: string[];
  changeDateHandler: (newValue: string, fieldName: keyof T) => void;
  changeTimeHandler: (newValue: string, fieldName: keyof K) => void;
  typeForm: string;
  fieldNameDate: keyof T;
  fieldNameTime: keyof K;
  titleText: string;
  readonly?: boolean;
  placeholderDate?: string;
  placeholderTime?: string;
}

const AssembledBlockFieldDatetime = <T, K extends unknown>({
  valueDate,
  valueTime,
  errorsDate,
  errorsTime,
  changeDateHandler,
  changeTimeHandler,
  typeForm,
  fieldNameDate,
  fieldNameTime,
  titleText,
  readonly = false,
  placeholderDate,
  placeholderTime,
}: IAssembledBlockFieldDatetimeProps<T, K>) => {
  return (
    <FormBlock
      titleText={titleText}
      classes={`${typeForm}-${camelToKebab(String(fieldNameDate))}`}
    >
      <FormField
        errors={[errorsDate, errorsTime]}
        classes={`${typeForm}-${camelToKebab(String(fieldNameDate))}`}
      >
        <FormFieldDatetime
          valueDate={valueDate}
          valueTime={valueTime}
          changeDateHandler={changeDateHandler}
          changeTimeHandler={changeTimeHandler}
          fieldNameDate={fieldNameDate}
          fieldNameTime={fieldNameTime}
          readonly={readonly}
          placeholderDate={placeholderDate}
          placeholderTime={placeholderTime}
        />
      </FormField>
    </FormBlock>
  );
};

export default observer(AssembledBlockFieldDatetime);
