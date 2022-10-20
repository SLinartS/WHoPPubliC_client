import { observer } from 'mobx-react-lite';
import { FC, useEffect } from 'react';
import { useRootStore } from '../../../utils/RootStoreProvider/useRootStore';
import Button from '../../blocks/Button';
import Table from '../../blocks/table/Table';

const Products: FC = observer(() => {
	const { productsStore, popUpControlStore } = useRootStore();

	useEffect(() => {
		if (productsStore.status === 'pending') {
			productsStore.getProducts();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [productsStore.status]);

	function showAddProductWindowHandler() {
		popUpControlStore.showAddProductWindow();
	}

	return (
		<main className='products'>
			<div className='products__title'>
				<h3 className='products__title-text'>Список товаров</h3>
			</div>
			<div className='products__action'>
				<p className='products__search-text'>Поиск: </p>
				<input type='text' className='products__search-input' />
				<Button text='Добавить' onClick={showAddProductWindowHandler} />
			</div>

			{productsStore.status === 'done' ? (
				<Table
					key={Math.random()}
					data={productsStore.products.data}
					tableHeader={productsStore.products.tableHeader}
				/>
			) : (
				''
			)}
		</main>
	);
});

export default Products;
