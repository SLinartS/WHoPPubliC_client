import { camelToKebab } from '@utils/stringStyleConvert/camelToKebab';
import { observer } from 'mobx-react-lite';

import FormBlock from '../block/Block';
import FormField from '../field/Field';
import FormFieldTime from '../field/time/Time';

interface IAssembledBlockFieldTimeProps<T, I> {
  value: string;
  errors: string[];
  changeHandler: (
    newValue: string,
    fieldName: keyof T,
    additionalInformation: I,
  ) => void;
  typeForm: string;
  fieldName: keyof T;
  additionalInformation: I;
  titleText: string;
  readonly?: boolean;
  placeholder?: string;
}

const AssembledBlockFieldTime = <T, I extends unknown>({
  value,
  errors,
  changeHandler,
  typeForm,
  fieldName,
  additionalInformation,
  titleText,
  readonly = false,
  placeholder,
}: IAssembledBlockFieldTimeProps<T, I>) => {
  return (
    <FormBlock
      titleText={titleText}
      classes={`${typeForm}-${camelToKebab(String(fieldName))}`}
    >
      <FormField
        errors={[errors]}
        classes={`${typeForm}-${camelToKebab(String(fieldName))}`}
      >
        <FormFieldTime
          value={value}
          changeHandler={changeHandler}
          fieldName={fieldName}
          additionalInformation={additionalInformation}
          readonly={readonly}
          placeholder={placeholder}
        />
      </FormField>
    </FormBlock>
  );
};

export default observer(AssembledBlockFieldTime);
