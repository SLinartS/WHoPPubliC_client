import { IOption } from '@store/category/type';
import { camelToKebab } from '@utils/stringStyleConvert/camelToKebab';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';

import FormBlock from '../block/Block';
import FormField from '../field/Field';
import FormFieldSelect from '../field/select/Select';

interface IAssembledBlockFieldSelectProps {
  options: IOption[];
  errors: string[];
  changeHandler: (option: IOption) => void;
  currentOption: IOption;
  typeForm: string;
  fieldName: string;
  titleText: string;
}

const AssembledBlockFieldSelect: FC<IAssembledBlockFieldSelectProps> = ({
  typeForm,
  fieldName,
  titleText,
  options,
  errors,
  currentOption,
  changeHandler,
}) => {
  return (
    <FormBlock
      titleText={titleText}
      classes={`${typeForm}-${camelToKebab(fieldName)}`}
    >
      <FormField
        errors={[errors]}
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
