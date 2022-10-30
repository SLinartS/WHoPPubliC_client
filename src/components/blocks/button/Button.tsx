import { FC } from 'react';
import { IButtonProps } from './type';
import './style.scss';

const Button: FC<IButtonProps> = ({ additionalСlasses, text, onClick }) => (
  <button
    type='button'
    onClick={onClick}
    className={`button ${additionalСlasses}`}
  >
    {text}
  </button>
);

export default Button;
