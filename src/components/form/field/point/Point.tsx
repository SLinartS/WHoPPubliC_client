import chooseIcon from '@assets/images/choose.png';
import { TMouseImgEventHandler } from '@gtypes/form/type';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';

interface IFormFieldPointProps {
  clickHandler: TMouseImgEventHandler;
}

const FormFieldPoint: FC<IFormFieldPointProps> = ({ clickHandler }) => (
  <img
    className='form-layout__choose-icon'
    src={chooseIcon}
    alt='choose point'
    onClick={clickHandler}
  />
);

export default observer(FormFieldPoint);
