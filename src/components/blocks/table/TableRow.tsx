import { observer } from 'mobx-react-lite';
import { FC, ReactNode } from 'react';
import { IRowProps } from '../../../types/blocks/table';
import TableColumn from './TableColumn';

const TableRow: FC<IRowProps> = observer(({ columns, number }) => {
	function generateColumns() {
		let columnsNode: Array<ReactNode> = [];

		for (let text of Object.values(columns)) {
			columnsNode.push(<TableColumn text={text} />);
		}

		return columnsNode;
	}

	return (
		<>
			<TableColumn text={number} />
			{generateColumns()}
		</>
	);
});

export default TableRow;
