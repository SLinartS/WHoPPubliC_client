import { observer } from 'mobx-react-lite';
import { ChangeEventHandler, FC } from 'react';

import { ICategory } from '../../../../../store/category/type';

interface ISelectFieldInputProps {
  options: Array<ICategory>;
  value?: string;
  changeEvent?: ChangeEventHandler<HTMLInputElement | HTMLSelectElement>;
}

const FormFieldSelect: FC<ISelectFieldInputProps> = observer(
  ({ options, changeEvent, value }) => (
    <select
      className='form-block__select'
      value={value}
      onChange={changeEvent}
    >
      <option
        className='form-block__option'
        value='unset'
      >
        --- Выберите категорию ---
      </option>
      {options.map((option) => (
        <option
          key={option.id}
          className='form-block__option'
          value={option.id}
        >
          {option.title}
        </option>
      ))}
    </select>
  ),
);

export default FormFieldSelect;
