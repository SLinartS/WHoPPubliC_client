import { MouseEventHandler } from 'react';

export interface IButtonProps {
  additionalСlasses?: string;
  text: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}
