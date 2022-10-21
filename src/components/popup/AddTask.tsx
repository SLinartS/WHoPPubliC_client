import { observer } from 'mobx-react-lite';
import { FC, useEffect, useState } from 'react';
import { IProperties } from '../../types/blocks/propertiesBlock';
import { useRootStore } from '../../utils/RootStoreProvider/useRootStore';
import Button from '../blocks/Button';
import PropertiesBlock from '../blocks/PropertiesBlock';
import Table from '../blocks/table/Table';
import WindowHeader from '../blocks/WindowHeader';

const AddTask: FC = observer(() => {
	const { popUpControlStore, productsStore } = useRootStore();

	const [headerText, setHeaderText] = useState<string>('');

	function hideAddTaskWindowHandler() {
		popUpControlStore.hideAddTaskWindow();
	}

	useEffect(() => {
		if (productsStore.status === 'pending') {
			productsStore.getProducts();
		}
		setHeaderText(
			`Добавить задачу ${
				popUpControlStore.addTask.type === 'acceptance' ? ' приёмки ' : ' отгрузки'
			}`,
		);
	}, [popUpControlStore.addTask.type]);

	const MAIN_BLOCK_PROPERTIES: Array<IProperties> = [{ text: 'Дата начала' }, { text: 'Срок' }];

	return (
		<div className='add-task'>
			<WindowHeader text={headerText} closeWindowEvent={hideAddTaskWindowHandler} />
			<div className='add-task__content-block'>
				<div className='properties-block properties-block--article-info'>
					<div className='properties-block__block'>
						<p className='properties-block__title properties-block__title--big'>
							Идентификатор
						</p>
						<input className='properties-block__input' />
						<Button classes='button--window-header' text='Сгенерировать' />
					</div>
				</div>
				<PropertiesBlock
					classes='properties-block--title-info'
					properties={MAIN_BLOCK_PROPERTIES}
				/>
				<div className='properties-block'>
					<div className='properties-block__block'>
						<p className='properties-block__title'>Точки приёмки</p>
						<button className='properties-block__add-point'>+</button>
					</div>
					<div className='properties-block__block'>
						<p className='properties-block__title'>Точки раскладки</p>
						<button className='properties-block__add-point'>+</button>
					</div>
				</div>
				<div className='add-task__table-block'>
					<Button classes='button--add-task' text='Добавить' />

					{productsStore.status === 'done' ? (
						<Table
							data={productsStore.products.data}
							tableHeader={productsStore.products.tableHeader}
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
