import { observer } from 'mobx-react-lite';
import { FC } from 'react';
import { ITaskProps } from '../../../../types/tasks';
import { useRootStore } from '../../../../utils/RootStoreProvider/useRootStore';

const TableRow: FC<ITaskProps> = observer(
	({ number, id, deadlines, dateStart, dateEnd, operatorLogin }) => {
		const { tasksStore } = useRootStore();
		return (
			<>
				<div className='table__block table__block--row'>
					<p className='table__text'>{number}</p>
				</div>
				<div className='table__block table__block--row'>
					<p className='table__text table__text--id'>{id}</p>
				</div>
				<div className='table__block table__block--row'>
					<p className='table__text' onClick={() => tasksStore.deleteTask(id)}>
						{deadlines}
					</p>
				</div>
				<div className='table__block table__block--row'>
					<p className='table__text'>{dateStart}</p>
				</div>
				<div className='table__block table__block--row'>
					<p className='table__text'>{dateEnd}</p>
				</div>
				<div className='table__block table__block--row'>
					<p className='table__text'>{operatorLogin}</p>
				</div>
			</>
		);
	},
);

export default TableRow;
