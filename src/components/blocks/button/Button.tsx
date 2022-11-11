import './style.scss';

import { FC } from 'react';

import { TMouseButtonEventHandler } from '../../../types/form/type';

interface IButtonProps {
  additionalСlasses?: string;
  text: string;
  clickEvent?: TMouseButtonEventHandler;
}

const Button: FC<IButtonProps> = ({ additionalСlasses, text, clickEvent }) => {
  return (
    <button
      type='button'
      onClick={clickEvent}
      className={`button ${additionalСlasses}`}
    >
      {text}
    </button>
  );
};

export default Button;
