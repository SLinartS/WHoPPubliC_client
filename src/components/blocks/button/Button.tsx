import './style.scss';

import { FC } from 'react';

import { TMouseButtonEventHandler } from '../../../types/form/type';

interface IButtonProps {
  additionalСlasses?: string;
  text: string;
  clickHandler?: TMouseButtonEventHandler;
}

const Button: FC<IButtonProps> = ({
  additionalСlasses,
  text,
  clickHandler,
}) => {
  return (
    <button
      type='button'
      onClick={clickHandler}
      className={`button ${additionalСlasses}`}
    >
      {text}
    </button>
  );
};

export default Button;
