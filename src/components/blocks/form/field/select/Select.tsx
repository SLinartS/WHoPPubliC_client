import { observer } from 'mobx-react-lite';
import { ChangeEvent, FC } from 'react';

import { ICategory } from '../../../../../store/category/type';
import { TChangeFieldHandler } from '../../../../../types/form/type';

interface ISelectFieldInputProps {
  options: ICategory[];
  value?: string;
  changeHandler: TChangeFieldHandler;
}

const FormFieldSelect: FC<ISelectFieldInputProps> = observer(
  ({ options, changeHandler, value }) => {
    /*  to remove the error from the absence of onChange. 
        See:
        https://github.com/facebook/react/issues/1118
        https://github.com/facebook/react/issues/22439 */
    function changeLocalHandler(e: ChangeEvent<HTMLSelectElement>) {
      changeHandler(e);
    }

    return (
      <select
        className='form-block__select'
        value={value}
        onChange={changeLocalHandler}
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
    );
  },
);

export default FormFieldSelect;
