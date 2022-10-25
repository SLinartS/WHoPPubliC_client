import { observer } from 'mobx-react-lite';
import { FC, useEffect, useState } from 'react';
import { IProperties } from '../../types/blocks/propertiesBlock';
import { useRootStore } from '../../utils/RootStoreProvider/useRootStore';
import Button from '../blocks/Button';
import PropertiesBlock from '../blocks/PropertiesBlock';
import PropertyPointBlock from '../blocks/PropertiesPointBlock';
import PropertyHeadBlock from '../blocks/PropertyHeadBlock';
import Table from '../blocks/table/Table';
import WindowHeader from '../blocks/WindowHeader';

const AddAcceptanceTask: FC = observer(() => {
	const { popUpControlStore, productsStore } = useRootStore();

	function hideAddAcceptanceTaskWindowHandler() {
		popUpControlStore.hideAddAcceptanceTaskWindow();
	}

	function showAddProductWindowHandler() {
		popUpControlStore.showAddProductWindow();
		popUpControlStore.hideAddAcceptanceTaskWindow();
	}

	useEffect(() => {
		if (productsStore.productsOfAcceptanceTaskStatus === 'pending') {
			productsStore.getProductsOfAcceptanceTask(5);
		}
	}, []);
	const MAIN_BLOCK_PROPERTIES: Array<IProperties> = [{ text: 'Дата начала' }, { text: 'Срок' }];

	return (
		<div className='add-task'>
			<WindowHeader
				text={'Добавить задачу приёмки'}
				closeWindowEvent={hideAddAcceptanceTaskWindowHandler}
			/>
			<div className='add-task__content-block'>
				<PropertyHeadBlock property={{ text: 'Идентификатор' }} />
				<PropertiesBlock
					classes='properties-block--title-info'
					properties={MAIN_BLOCK_PROPERTIES}
				/>
				<PropertyPointBlock
					properties={[{ text: 'Точки приёмки' }, { text: 'Точки раскладки' }]}
				/>
				<div className='add-task__table-block'>
					<Button
						classes='button--add-task'
						text='Добавить'
						onClick={showAddProductWindowHandler}
					/>

					{productsStore.productsOfAcceptanceTaskStatus === 'done' ? (
						<Table
							data={productsStore.productsOfAcceptanceTask.data}
							tableHeader={productsStore.productsOfAcceptanceTask.tableHeader}
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
