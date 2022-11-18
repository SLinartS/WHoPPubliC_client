import { observer } from 'mobx-react-lite';
import { FC } from 'react';

import { TMouseButtonEventHandler } from '../../../types/form/type';

interface IButtonProps {
  classes?: string;
  text: string;
  clickHandler?: TMouseButtonEventHandler;
}

const Button: FC<IButtonProps> = observer(({ classes, text, clickHandler }) => {
  return (
    <button
      type='button'
      onClick={clickHandler}
      className={`button ${classes}`}
    >
      {text}
    </button>
  );
});

export default Button;
