import { FC } from 'react';
import { TableColumnProps } from './types';


const TableColumn: FC<TableColumnProps> = ({ additionalСlasses, text }) => {
	return (
		<div className={'table__block ' + additionalСlasses}>
			<p className='table__text'>{text}</p>
		</div>
	);
};

export default TableColumn;
