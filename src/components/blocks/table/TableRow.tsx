import { observer } from 'mobx-react-lite';
import { FC } from 'react';
import { IRowProps } from '../../../types/blocks/table';
import TableColumn from './TableColumn';

const TableRow: FC<IRowProps> = observer(({ columns }) => {
	return (
		<>
			{Object.entries(columns).map(([key, value]) => (
				<TableColumn key={key + value} text={value} />
			))}
		</>
	);
});

export default TableRow;
