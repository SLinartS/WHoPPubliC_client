import { MouseEventHandler } from 'react';

export interface IWindowHeaderProps {
	classes?: string;
	text: string;
	closeWindowEvent: MouseEventHandler<HTMLButtonElement>;
}
