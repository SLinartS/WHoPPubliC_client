import './style.scss';

import { FC } from 'react';

import { TMouseButtonEvent } from '../../../types/form/type';

interface IButtonProps {
  additionalСlasses?: string;
  text: string;
  clickEvent?: TMouseButtonEvent;
}

const Button: FC<IButtonProps> = ({ additionalСlasses, text, clickEvent }) => (
  <button
    type='button'
    onClick={clickEvent}
    className={`button ${additionalСlasses}`}
  >
    {text}
  </button>
);

export default Button;
