import './style.scss';

import { TMouseButtonEventHandler } from '@gtypes/form/type';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';

interface IButtonProps {
  classes?: string;
  text: string;
  clickHandler?: TMouseButtonEventHandler;
  isDisabled?: boolean;
}

const Button: FC<IButtonProps> = ({
  classes,
  text,
  clickHandler,
  isDisabled = false,
}) => {
  return (
    <button
      type='button'
      onClick={clickHandler}
      className={`button ${classes}`}
      disabled={isDisabled}
    >
      {text}
    </button>
  );
};

export default observer(Button);
