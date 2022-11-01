import { observer } from 'mobx-react-lite';
import { FC } from 'react';
import { ISelectFiledInputProps } from './type';

const FormFieldSelect: FC<ISelectFiledInputProps> = observer(
  ({ options, changeEvent, value }) => (
    <select
      className='properties-block__select'
      value={value}
      onChange={changeEvent}
    >
      <option
        className='properties-block__option'
        value='unset'
      >
        --- Выберите категорию ---
      </option>
      {options.map((option) => (
        <option
          key={option.id}
          className='properties-block__option'
          value={option.id}
        >
          {option.option}
        </option>
      ))}
    </select>
  ),
);

export default FormFieldSelect;
