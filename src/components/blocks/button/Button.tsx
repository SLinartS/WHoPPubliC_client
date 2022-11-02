import './style.scss';

import { FC, MouseEventHandler } from 'react';

interface IButtonProps {
  additionalСlasses?: string;
  text: string;
  clickEvent?: MouseEventHandler<HTMLButtonElement>;
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
