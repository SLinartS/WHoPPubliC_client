import { observer } from 'mobx-react-lite';
import { FC } from 'react';
import { TableColumnProps } from './types';


const TableHeaderColumn: FC<TableColumnProps> = observer(({ text }) => {
	return (
		<div className='table__block table__block--header'>
			<p className='table__text'>{text}</p>
		</div>
	); 
});

export default TableHeaderColumn;
