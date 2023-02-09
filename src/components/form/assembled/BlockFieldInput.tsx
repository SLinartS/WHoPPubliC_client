import { IProductFormDataFields } from '@store/popup/form/product/type';
import { ITaskFormDataFields } from '@store/popup/form/task/type';
import { IUserFormDataFields } from '@store/popup/form/user/type';
import { camelToKebab } from '@utils/stringStyleConvert/camelToKebab';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';

import FormBlock from '../block/Block';
import FormField from '../field/Field';
import FormFieldInput from '../field/input/Input';

interface IAssembledBlockFieldInputProps {
  typeForm: 'task' | 'product' | 'user';
  fieldName:
    | keyof IProductFormDataFields
    | keyof ITaskFormDataFields
    | keyof IUserFormDataFields;
  titleText: string;
  readonlyInput: boolean;
  placeholder?: string;
}

const AssembledBlockFieldInput: FC<IAssembledBlockFieldInputProps> = ({
  typeForm,
  fieldName,
  titleText,
  readonlyInput,
  placeholder,
}) => {
  return (
    <FormBlock
      titleText={titleText}
      classes={`${typeForm}-${camelToKebab(fieldName)}`}
    >
      <FormField
        typeForm={typeForm}
        fieldName={fieldName}
        classes={`${typeForm}-${camelToKebab(fieldName)}`}
      >
        <FormFieldInput
          typeForm={typeForm}
          fieldName={fieldName}
          readonly={readonlyInput}
          placeholder={placeholder}
        />
      </FormField>
    </FormBlock>
  );
};

export default observer(AssembledBlockFieldInput);
