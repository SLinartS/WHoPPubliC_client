import { observer } from 'mobx-react-lite';
import { ChangeEvent, FC } from 'react';

import { TChangeFieldHandler } from '../../../../../types/form/type';

interface IFormFieldInputProps {
  additionalСlasses?: string;
  value: string;
  changeHandler: TChangeFieldHandler;
}

const FormFieldInput: FC<IFormFieldInputProps> = observer(
  ({ additionalСlasses, value, changeHandler }) => {
    /*  to remove the error from the absence of onChange. 
        See:
        https://github.com/facebook/react/issues/1118
        https://github.com/facebook/react/issues/22439 */
    function changeLocalHandler(e: ChangeEvent<HTMLInputElement>) {
      changeHandler(e);
    }

    return (
      <input
        value={value}
        className={`form-block__input ${additionalСlasses}`}
        onChange={changeLocalHandler}
      />
    );
  },
);

export default FormFieldInput;
