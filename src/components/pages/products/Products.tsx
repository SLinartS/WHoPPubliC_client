import { observer } from 'mobx-react-lite';
import { FC, useEffect } from 'react';
import { useRootStore } from '../../../utils/RootStoreProvider/useRootStore';
import Table from '../../blocks/table/Table';

const Products: FC = observer(() => {
	const { productsStore } = useRootStore();

	useEffect(() => {
		if (productsStore.productsStatus === 'pending') {
			productsStore.getProducts();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [productsStore.productsStatus]);

	return (
		<main className='products'>
			<div className='products__title'>
				<h3 className='products__title-text'>Список товаров</h3>
			</div>
			<div className='products__action'>
				<p className='products__search-text'>Поиск: </p>
				<input type='text' className='products__search-input' />
			</div>

			{productsStore.productsStatus === 'done' ? (
				<Table
					key={Math.random()}
					data={productsStore.products.data}
					tableHeader={productsStore.products.tableHeader}
					classes={'table--products'}
				/>
			) : (
				''
			)}
		</main>
	);
});

export default Products;
