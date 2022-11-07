import { observer } from 'mobx-react-lite';
import { FC } from 'react';

import plusImage from '../../../../../assets/icons/choose.png';
import { TMouseButtonEvent } from '../../../../../types/form/type';

interface IFormFieldPointProps {
  clickHandler: TMouseButtonEvent;
}

const FormFieldPoint: FC<IFormFieldPointProps> = observer(
  ({ clickHandler }) => (
    <button
      type='button'
      className='form-block__add-point'
      onClick={clickHandler}
    >
      <img
        className='form-block__plus-icon'
        src={plusImage}
        alt='plus'
      />
    </button>
  ),
);

export default FormFieldPoint;
