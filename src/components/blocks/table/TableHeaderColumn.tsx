import { observer } from 'mobx-react-lite';
import { FC } from 'react';
import { TableColumnProps } from '../../../types/blocks/table';

const TableHeader: FC<TableColumnProps> = observer(({ text }) => {
	return (
		<div className='table__block table__block--header'>
			<p className='table__text'>{text}</p>
		</div>
	); 
});

export default TableHeader;
