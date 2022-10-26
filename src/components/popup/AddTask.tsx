import { observer } from 'mobx-react-lite';
import { FC, useEffect } from 'react';

import { ChangeFieldEvent } from '../../types/popup/popupWindows';
import { addAcceptanceTaskFormDataFields } from '../../types/store/addAcceptanceTaskForm';
import { useRootStore } from '../../utils/RootStoreProvider/useRootStore';
import Button from '../blocks/button/Button';

import FormBlock from '../blocks/form/block/Block';
import FormFieldInput from '../blocks/form/field/input/Input';
import FormLayout from '../blocks/form/layout/Layout';

import Table from '../blocks/table/Table';
import WindowHeader from '../blocks/WindowHeader';

const AddTask: FC = observer(() => {
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

	return (
		<div className='add-task'>
			<WindowHeader
				text={'Добавить задачу приёмки'}
				closeWindowEvent={hideAddAcceptanceTaskWindowHandler}
			/>
			<div className='add-task__content-block'>
				<FormLayout additionalСlasses='properties-block--article-info'>
					<FormBlock
						titleText='Название'
						additionalTitleBlockClasses='properties-block__title--big'
					>
						<FormFieldInput
							value={addAcceptanceTaskFormStore.title}
							changeEvent={(e) => changeFieldHandler(e, 'title')}
							additionalСlasses='properties-block__input--big'
						/>
						<Button additionalСlasses='button--window-header' text='Сгенерировать' />
					</FormBlock>
				</FormLayout>

				<FormLayout additionalСlasses='properties-block--title-info'>
					<FormBlock titleText='Дата начала'>
						<FormFieldInput
							value={addAcceptanceTaskFormStore.dateStart}
							changeEvent={(e) => changeFieldHandler(e, 'dateStart')}
						/>
					</FormBlock>
					<FormBlock titleText='Дата окончания'>
						<FormFieldInput
							value={addAcceptanceTaskFormStore.dateEnd}
							changeEvent={(e) => changeFieldHandler(e, 'dateEnd')}
						/>
					</FormBlock>
				</FormLayout>

				{/* <PropertiesPointBlock
					properties={[{ text: 'Точки приёмки' }, { text: 'Точки раскладки' }]}
				/> */}

				<div className='add-task__table-block'>
					<Button
						additionalСlasses='button--add-task'
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

export default AddTask;
