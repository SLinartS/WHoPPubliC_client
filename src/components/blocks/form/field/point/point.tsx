import { observer } from 'mobx-react-lite';
import { FC } from 'react';
import { IFormFieldPointProps } from './type';

const FormFieldPoint: FC<IFormFieldPointProps> = observer(({ clickEvent }) => (
  <button
    type='button'
    className='properties-block__add-point'
    onClick={clickEvent}
  >
    +
  </button>
));

export default FormFieldPoint;
