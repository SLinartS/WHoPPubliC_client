import { observer } from 'mobx-react-lite';
import { FC } from 'react';

import { IOptions } from '../../../../../store/category/type';
import { IProductFormDataFields } from '../../../../../store/popup/form/product/type';
import { TChangeFieldEvent } from '../../../../../types/form/type';
import { useRootStore } from '../../../../../utils/RootStoreProvider/useRootStore';

interface IFormFieldSelectProps {
  options: IOptions[];
  fieldName: keyof IProductFormDataFields;
}

const FormFieldSelect: FC<IFormFieldSelectProps> = observer(
  ({ options, fieldName }) => {
    const { storePopup } = useRootStore();

    function changeFieldHandler(e: TChangeFieldEvent) {
      storePopup.form.product.setFormField(fieldName, e.target.value);
    }

    function getValue(): string {
      return storePopup.form.product.getFormField(fieldName);
    }

    return (
      <select
        className='form-layout__select'
        value={getValue()}
        onChange={changeFieldHandler}
      >
        <option
          className='form-layout__option'
          value='unset'
        >
          Выберите категорию
        </option>
        {options.map((option) => (
          <option
            key={option.id}
            className='form-layout__option'
            value={option.id}
          >
            {option.title}
          </option>
        ))}
      </select>
    );
  },
);

export default FormFieldSelect;
