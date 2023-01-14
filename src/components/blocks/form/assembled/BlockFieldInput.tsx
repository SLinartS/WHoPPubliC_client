import React, { FC } from 'react';

import { IProductFormDataFields } from '../../../../store/popup/form/product/type';
import { ITaskFormDataFields } from '../../../../store/popup/form/task/type';
import { camelToKebab } from '../../../../utils/stringStyleConvert/camelToKebab';
import FormBlock from '../block/Block';
import FormField from '../field/Field';
import FormFieldInput from '../field/input/Input';

interface IAssembledBlockFieldInputProps {
  typeForm: 'task' | 'product';
  fieldName: keyof IProductFormDataFields | keyof ITaskFormDataFields;
  titleText: string;
  readonlyInput: boolean;
}

const AssembledBlockFieldInput: FC<IAssembledBlockFieldInputProps> = ({
  typeForm,
  fieldName,
  titleText,
  readonlyInput,
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
        />
      </FormField>
    </FormBlock>
  );
};

export default AssembledBlockFieldInput;
