import { IOption } from '@store/category/type';
import { camelToKebab } from '@utils/stringStyleConvert/camelToKebab';
import { observer } from 'mobx-react-lite';

import FormBlock from '../block/Block';
import FormField from '../field/Field';
import FormFieldSelect from '../field/select/Select';

interface IAssembledBlockFieldSelectProps<T> {
  options: IOption<T>[];
  errors: string[];
  changeHandler: (option: IOption<T>) => void;
  currentOption: IOption<T>;
  typeForm: string;
  fieldName: string;
  titleText: string;
}

const AssembledBlockFieldSelect = <T extends unknown>({
  typeForm,
  fieldName,
  titleText,
  options,
  errors,
  currentOption,
  changeHandler,
}: IAssembledBlockFieldSelectProps<T>) => {
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
