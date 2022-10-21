import { observer } from 'mobx-react-lite';
import { FC } from 'react';
import { IWindowHeaderProps } from '../../types/blocks/windowHeader';
import Button from './Button';

const WindowHeader: FC<IWindowHeaderProps> = observer(({ classes, text, closeWindowEvent }) => {
	return (
		<div className='window-header'>
			<h3 className='window-header__title'>{text}</h3>
			<Button classes='button--window-header' text='Добавить' />
			<Button
				classes='button--window-header'
				text='Отмена'
				onClick={closeWindowEvent}
			/>
		</div>
	);
});

export default WindowHeader;
