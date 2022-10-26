import { observer } from 'mobx-react-lite';
import { FC, useEffect } from 'react';
import { IProperties } from '../../types/blocks/propertiesBlock/propertiesBlock';

import { ChangeFieldEvent } from '../../types/popup/popupWindows';
import { addAcceptanceTaskFormDataFields } from '../../types/store/addAcceptanceTaskForm';
import { useRootStore } from '../../utils/RootStoreProvider/useRootStore';
import Button from '../blocks/Button';
import PropertiesBlock from '../blocks/propertiesBlock/PropertiesBlock';
import PropertiesPointBlock from '../blocks/propertiesBlock/PropertiesPointBlock';
import PropertyHeadBlock from '../blocks/propertiesBlock/PropertyHeadBlock';

import Table from '../blocks/table/Table';
import WindowHeader from '../blocks/WindowHeader';

const AddAcceptanceTask: FC = observer(() => {
	const { popUpControlStore, productsStore, addAcceptanceTaskFormStore, tasksStore } =
		useRootStore();

	function changeFieldHandler(
		e: ChangeFieldEvent,
		fieldName: keyof addAcceptanceTaskFormDataFields,
	) {
		addAcceptanceTaskFormStore[fieldName] = e.target.value;
	}

	function hideAddAcceptanceTaskWindowHandler() {
		popUpControlStore.hideAddAcceptanceTaskWindow();
	}

	function showAddProductWindowHandler() {
		if (!tasksStore.statusTaskHasBeenAdded) {
			if (addAcceptanceTaskFormStore.title) {
				tasksStore.addTask('1', addAcceptanceTaskFormStore.title, '1');
			} else {
				alert('Заполните название задачи!');
			}
		} else {
			popUpControlStore.showAddProductWindow();
			popUpControlStore.hideAddAcceptanceTaskWindow();
		}
	}

	useEffect(() => {
		if (
			productsStore.statusGetProductsOfTask === 'pending' &&
			addAcceptanceTaskFormStore.title
		) {
			productsStore.getProductsOfAcceptanceTask(addAcceptanceTaskFormStore.title);
		}

		if (tasksStore.statusAddTask === 'done' && !tasksStore.statusTaskHasBeenAdded) {
			tasksStore.statusTaskHasBeenAdded = true;
			tasksStore.statusGetAcceptanceTasks = 'pending';
			popUpControlStore.showAddProductWindow();
			popUpControlStore.hideAddAcceptanceTaskWindow();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [tasksStore.statusAddTask, productsStore.statusGetProductsOfTask]);

	const MAIN_BLOCK_PROPERTIES: Array<IProperties> = [
		{
			text: 'Дата начала',
			changeEvent: (e) => changeFieldHandler(e, 'dateStart'),
			value: addAcceptanceTaskFormStore.dateStart,
		},
		{
			text: 'Дата окончания',
			changeEvent: (e) => changeFieldHandler(e, 'dateEnd'),
			value: addAcceptanceTaskFormStore.dateEnd,
		},
	];

	return (
		<div className='add-task'>
			<WindowHeader
				text={'Добавить задачу приёмки'}
				closeWindowEvent={hideAddAcceptanceTaskWindowHandler}
			/>
			<div className='add-task__content-block'>
				<PropertyHeadBlock
					property={{
						text: 'Название',
						changeEvent: (e) => changeFieldHandler(e, 'title'),
						value: addAcceptanceTaskFormStore.title,
					}}
				/>
				<PropertiesBlock
					classes='properties-block--title-info'
					properties={MAIN_BLOCK_PROPERTIES}
				/>
				<PropertiesPointBlock
					properties={[{ text: 'Точки приёмки' }, { text: 'Точки раскладки' }]}
				/>
				<div className='add-task__table-block'>
					<Button
						classes='button--add-task'
						text='Добавить'
						onClick={showAddProductWindowHandler}
					/>

					{productsStore.statusGetProductsOfTask === 'done' ? (
						<Table
							data={productsStore.productsOfTask.data}
							tableHeader={productsStore.productsOfTask.tableHeader}
							classes={'table--add-task'}
						/>
					) : (
						''
					)}
				</div>
			</div>
		</div>
	);
});

export default AddAcceptanceTask;
