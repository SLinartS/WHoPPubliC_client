import { FC } from 'react';

import { IOption } from '../../../../store/category/type';
import { IProductFormDataFields } from '../../../../store/popup/form/product/type';
import { camelToKebab } from '../../../../utils/stringStyleConvert/camelToKebab';
import FormBlock from '../block/Block';
import FormField from '../field/Field';
import FormFieldSelect from '../field/select/Select';

interface IAssembledBlockFieldSelectProps {
  typeForm: 'task' | 'product';
  fieldName: keyof IProductFormDataFields;
  titleText: string;
  options: IOption[];
}

const AssembledBlockFieldSelect: FC<IAssembledBlockFieldSelectProps> = ({
  typeForm,
  fieldName,
  titleText,
  options,
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
        <FormFieldSelect
          fieldName={fieldName}
          options={options}
        />
      </FormField>
    </FormBlock>
  );
};

export default AssembledBlockFieldSelect;
