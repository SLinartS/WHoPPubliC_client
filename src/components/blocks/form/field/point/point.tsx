import { observer } from 'mobx-react-lite';
import { FC, MouseEventHandler } from 'react';

interface IFormFieldPointProps {
  clickEvent: MouseEventHandler<HTMLButtonElement>;
}

const FormFieldPoint: FC<IFormFieldPointProps> = observer(({ clickEvent }) => (
  <button
    type='button'
    className='form-block__add-point'
    onClick={clickEvent}
  >
    +
  </button>
));

export default FormFieldPoint;
