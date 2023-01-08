import { observer } from 'mobx-react-lite';
import { FC } from 'react';

import chooseIcon from '../../../../../assets/icons/choose.png';
import { TMouseImgEventHandler } from '../../../../../types/form/type';

interface IFormFieldPointProps {
  clickHandler: TMouseImgEventHandler;
}

const FormFieldPoint: FC<IFormFieldPointProps> = observer(
  ({ clickHandler }) => (
    <img
      className='form-layout__choose-icon'
      src={chooseIcon}
      alt='choose point'
      onClick={clickHandler}
    />
  ),
);

export default FormFieldPoint;
