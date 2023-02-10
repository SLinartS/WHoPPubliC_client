import { camelToKebab } from '@utils/stringStyleConvert/camelToKebab';
import { observer } from 'mobx-react-lite';

import FormBlock from '../block/Block';
import FormField from '../field/Field';
import FormFieldInput from '../field/input/Input';

interface IAssembledBlockFieldInputProps<T> {
  value: string;
  errors: string[];
  changeHandler: (newValue: string, fieldName: keyof T) => void;
  typeForm: string;
  fieldName: keyof T;
  titleText: string;
  readonly: boolean;
  placeholder?: string;
}

const AssembledBlockFieldInput = <T extends unknown>({
  typeForm,
  fieldName,
  titleText,
  errors,
  changeHandler,
  value,
  readonly = false,
  placeholder,
}: IAssembledBlockFieldInputProps<T>) => {
  return (
    <FormBlock
      titleText={titleText}
      classes={`${typeForm}-${camelToKebab(String(fieldName))}`}
    >
      <FormField
        errors={errors}
        classes={`${typeForm}-${camelToKebab(String(fieldName))}`}
      >
        <FormFieldInput
          value={value}
          changeHandler={changeHandler}
          fieldName={fieldName}
          readonly={readonly}
          placeholder={placeholder}
        />
      </FormField>
    </FormBlock>
  );
};

export default observer(AssembledBlockFieldInput);
