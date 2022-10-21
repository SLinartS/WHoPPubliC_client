import { FC } from 'react';
import { TableColumnProps } from '../../../types/blocks/table';

const TableColumn: FC<TableColumnProps> = ({ text }) => {
	return (
		<div className='table__block table__block--row'>
			<p className='table__text'>{text}</p>
		</div>
	);
};

export default TableColumn;
