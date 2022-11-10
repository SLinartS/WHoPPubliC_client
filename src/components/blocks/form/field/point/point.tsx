import { observer } from 'mobx-react-lite';
import { FC } from 'react';

import plusImage from '../../../../../assets/icons/choose.png';
import { TMouseButtonEventHandler } from '../../../../../types/form/type';

interface IFormFieldPointProps {
  clickHandler: TMouseButtonEventHandler;
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
