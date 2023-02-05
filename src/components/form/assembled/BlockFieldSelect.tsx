import { IOption } from '@store/category/type';
import { IAccountFormDataFields } from '@store/popup/form/account/type';
import { IProductFormDataFields } from '@store/popup/form/product/type';
import { camelToKebab } from '@utils/stringStyleConvert/camelToKebab';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';

import FormBlock from '../block/Block';
import FormField from '../field/Field';
import FormFieldSelect from '../field/select/Select';

interface IAssembledBlockFieldSelectProps {
  typeForm: 'task' | 'product' | 'account';
  fieldName: keyof IProductFormDataFields | keyof IAccountFormDataFields;
  titleText: string;
  options: IOption[];
  currentOption: IOption;
  changeHandler: (option: IOption) => void;
}

const AssembledBlockFieldSelect: FC<IAssembledBlockFieldSelectProps> = ({
  typeForm,
  fieldName,
  titleText,
  options,
  currentOption,
  changeHandler,
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
          options={options}
          currentOption={currentOption}
          changeHandler={changeHandler}
        />
      </FormField>
    </FormBlock>
  );
};

export default observer(AssembledBlockFieldSelect);
