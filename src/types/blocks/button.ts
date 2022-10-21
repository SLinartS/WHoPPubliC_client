import { MouseEventHandler } from 'react';

export interface IButtonProps {
	classes?: string;
	text: string;
	onClick?: MouseEventHandler<HTMLButtonElement>;
}
