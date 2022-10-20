import { FC } from 'react';
import { IButtonProps } from '../../types/blocks/button';

const Button: FC<IButtonProps> = ({ classes, text, onClick }) => {
	return (
		<button onClick={onClick} className={'button ' + classes}>
			{text}
		</button>
	);
};

export default Button;
