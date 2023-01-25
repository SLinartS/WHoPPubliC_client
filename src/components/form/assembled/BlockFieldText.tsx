import { IProductFormDataFields } from '@store/popup/form/product/type';
import { ITaskFormDataFields } from '@store/popup/form/task/type';
import { camelToKebab } from '@utils/stringStyleConvert/camelToKebab';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';

import FormBlock from '../block/Block';
import FormField from '../field/Field';
import FormFieldText from '../field/text/Text';

interface IAssembledBlockFieldTextProps {
  typeForm: 'task' | 'product';
  fieldName: keyof IProductFormDataFields | keyof ITaskFormDataFields;
  titleText: string;
}

const AssembledBlockFieldText: FC<IAssembledBlockFieldTextProps> = ({
  typeForm,
  fieldName,
  titleText,
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
        <FormFieldText
          typeForm={typeForm}
          fieldName={fieldName}
        />
      </FormField>
    </FormBlock>
  );
};

export default observer(AssembledBlockFieldText);
