import { FC } from 'react';
import { TableColumnProps } from '../../../types/blocks/table';

const TableColumn: FC<TableColumnProps> = ({ stroke }) => {
	return (
		<div className='table__block table__block--row'>
			<p className='table__text'>{stroke}</p>
		</div>
	);
};

export default TableColumn;
