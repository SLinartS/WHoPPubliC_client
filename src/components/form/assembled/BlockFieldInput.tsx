import { camelToKebab } from '@utils/stringStyleConvert/camelToKebab';
import { observer } from 'mobx-react-lite';
import { HTMLInputTypeAttribute } from 'react';

import FormBlock from '../block/Block';
import FormField from '../field/Field';
import FormFieldInput from '../field/input/Input';

interface IAssembledBlockFieldInputProps<T, I> {
  value: string;
  errors: string[];
  changeHandler: (newValue: string, fieldName: keyof T) => void;
  typeForm: string;
  fieldName: keyof T;
  titleText?: string;
  readonly?: boolean;
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

const AssembledBlockFieldInput = <T, I extends unknown>({
  typeForm,
  fieldName,
  titleText,
  errors,
  changeHandler,
  value,
  readonly = false,
  placeholder,
  classes,
  onFocusHandler,
  additionalInformation,
  inputType = 'text',
}: IAssembledBlockFieldInputProps<T, I>) => {
  return (
    <FormBlock
      titleText={titleText}
      classes={`${typeForm}-${camelToKebab(String(fieldName))}`}
    >
      <FormField
        errors={[errors]}
        classes={`${typeForm}-${camelToKebab(String(fieldName))}`}
      >
        <FormFieldInput
          value={value}
          changeHandler={changeHandler}
          fieldName={fieldName}
          readonly={readonly}
          placeholder={placeholder}
          classes={classes}
          onFocusHandler={onFocusHandler}
          additionalInformation={additionalInformation}
          inputType={inputType}
          errors={errors}
        />
      </FormField>
    </FormBlock>
  );
};

export default observer(AssembledBlockFieldInput);
