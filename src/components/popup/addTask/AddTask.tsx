import { observer } from 'mobx-react-lite';
import { FC, useEffect } from 'react';
import { addTaskFormDataFields, ChangeFieldEvent } from '../../../store/form/type';
import { useRootStore } from '../../../utils/RootStoreProvider/useRootStore';
import Button from '../../blocks/button/Button';
import FormBlock from '../../blocks/form/block/Block';
import FormFieldInput from '../../blocks/form/field/input/Input';
import FormFieldPoint from '../../blocks/form/field/point/point';
import FormLayout from '../../blocks/form/layout/Layout';
import Table from '../../blocks/table/Table';
import WindowHeader from '../../blocks/windowHeader/WindowHeader';
import './style.scss';

const AddTask: FC = observer(() => {
	const { popupStore, productsStore, addTaskFormStore, tasksStore } = useRootStore();

	function changeFieldHandler(e: ChangeFieldEvent, fieldName: keyof addTaskFormDataFields) {
		addTaskFormStore[fieldName] = e.target.value;
	}

	function hideAddAcceptanceTaskWindowHandler() {
		popupStore.hideAddAcceptanceTaskWindow();
	}

	function showAddProductWindowHandler() {
		if (!tasksStore.statusTaskHasBeenAdded) {
			if (addTaskFormStore.title) {
				tasksStore.addTask('1', addTaskFormStore.title, '1');
			} else {
				alert('Заполните название задачи!');
			}
		} else {
			popupStore.showAddProductWindow();
			popupStore.hideAddAcceptanceTaskWindow();
		}
	}

	useEffect(() => {
		if (productsStore.statusGetProductsOfTask === 'pending' && addTaskFormStore.title) {
			productsStore.getProductsOfAcceptanceTask(addTaskFormStore.title);
		}

		if (tasksStore.statusAddTask === 'done' && !tasksStore.statusTaskHasBeenAdded) {
			tasksStore.statusTaskHasBeenAdded = true;
			tasksStore.statusGetAcceptanceTasks = 'pending';
			popupStore.showAddProductWindow();
			popupStore.hideAddAcceptanceTaskWindow();
		}
	}, [addTaskFormStore.title, tasksStore.statusAddTask, popupStore, productsStore, tasksStore]);

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
							value={addTaskFormStore.title}
							changeEvent={(e) => changeFieldHandler(e, 'title')}
							additionalСlasses='properties-block__input--big'
						/>
						<Button additionalСlasses='button--window-header' text='Сгенерировать' />
					</FormBlock>
				</FormLayout>

				<FormLayout additionalСlasses='properties-block--title-info'>
					<FormBlock titleText='Дата начала'>
						<FormFieldInput
							value={addTaskFormStore.dateStart}
							changeEvent={(e) => changeFieldHandler(e, 'dateStart')}
						/>
					</FormBlock>
					<FormBlock titleText='Дата окончания'>
						<FormFieldInput
							value={addTaskFormStore.dateEnd}
							changeEvent={(e) => changeFieldHandler(e, 'dateEnd')}
						/>
					</FormBlock>
				</FormLayout>

				<FormLayout>
					<FormBlock titleText='Точки приёмки'>
						<FormFieldPoint />
					</FormBlock>
					<FormBlock titleText='Точки раскладки'>
						<FormFieldPoint />
					</FormBlock>
				</FormLayout>

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
							additionalСlasses={'table--add-task'}
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
