import { observer } from 'mobx-react-lite';
import { FC } from 'react';
import { IWindowHeaderProps } from '../../types/popup/windowHeader';
import Button from './Button';

const WindowHeader: FC<IWindowHeaderProps> = observer(
	({ classes, text,closeWindowEvent, actionEvent }) => {
		return (
			<div className={'window-header ' + classes}>
				<h3 className='window-header__title'>{text}</h3>
				<Button classes='button--window-header' text='Добавить' onClick={actionEvent} />
				<Button classes='button--window-header' text='Отмена' onClick={closeWindowEvent} />
			</div>
		);
	},
);

export default WindowHeader;
