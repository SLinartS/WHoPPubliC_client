import { camelToKebab } from '@utils/stringStyleConvert/camelToKebab';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';

import FormBlock from '../block/Block';
import FormField from '../field/Field';
import FormFieldText from '../field/text/Text';

interface IAssembledBlockFieldTextProps {
  value: string;
  errors: string[];
  typeForm: string;
  fieldName: string;
  titleText: string;
}

const AssembledBlockFieldText: FC<IAssembledBlockFieldTextProps> = ({
  value,
  typeForm,
  fieldName,
  titleText,
  errors,
}) => {
  return (
    <FormBlock
      titleText={titleText}
      classes={`${typeForm}-${camelToKebab(fieldName)}`}
    >
      <FormField
        errors={errors}
        classes={`${typeForm}-${camelToKebab(fieldName)}`}
      >
        <FormFieldText value={value} />
      </FormField>
    </FormBlock>
  );
};

export default observer(AssembledBlockFieldText);
