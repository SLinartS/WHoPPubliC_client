import { observer } from 'mobx-react-lite';
import { FC, useEffect } from 'react';
import { useRootStore } from '../../../utils/RootStoreProvider/useRootStore';
import Table from '../tasks/table/Table';

const Products: FC = observer(() => {
	const { productsStore } = useRootStore();

	useEffect(() => {
		if (productsStore.status === 'pending') {
			productsStore.getProducts();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [productsStore.status]);

	return (
		<main className='products'>
			<div className='products__title'>
				<h3 className='products__title-text'>Список товаров</h3>
			</div>
			<div className='products__search'>
				<p className='products__search-text'>Поиск: </p>
				<input type='text' className='products__search-input' />
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
