import { observer } from 'mobx-react-lite';
import { FC } from 'react';
import { TableColumnProps } from '../../../../types/elements/table';

const TableHeader: FC<TableColumnProps> = observer(({ stroke }) => {
	return (
		<div className='table__block table__block--header'>
			<p className='table__text'>{stroke}</p>
		</div>
	); 
});

export default TableHeader;
