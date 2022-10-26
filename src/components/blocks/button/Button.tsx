import { FC } from 'react';
import { IButtonProps } from './types';

const Button: FC<IButtonProps> = ({ additionalСlasses, text, onClick }) => {
	return (
		<button onClick={onClick} className={'button ' + additionalСlasses}>
			{text}
		</button>
	);
};

export default Button;
