import { observer } from 'mobx-react-lite';
import { FC } from 'react';
import Button from '../button/Button';
import { IWindowHeaderProps } from './types';

const WindowHeader: FC<IWindowHeaderProps> = observer(
	({ classes, text, closeWindowEvent, actionEvent }) => {
		return (
			<div className={'window-header ' + classes}>
				<h3 className='window-header__title'>{text}</h3>
				<Button
					additionalСlasses='button--window-header'
					text='Сохранить'
					onClick={actionEvent}
				/>
				<Button
					additionalСlasses='button--window-header'
					text='Отмена'
					onClick={closeWindowEvent}
				/>
			</div>
		);
	},
);

export default WindowHeader;
