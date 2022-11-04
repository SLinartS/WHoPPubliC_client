import { observer } from 'mobx-react-lite';
import { FC } from 'react';

import { TMouseButtonEvent } from '../../../../../types/form/type';

interface IFormFieldPointProps {
  clickHandler: TMouseButtonEvent;
}

const FormFieldPoint: FC<IFormFieldPointProps> = observer(({ clickHandler }) => (
  <button
    type='button'
    className='form-block__add-point'
    onClick={clickHandler}
  >
    +
  </button>
));

export default FormFieldPoint;
