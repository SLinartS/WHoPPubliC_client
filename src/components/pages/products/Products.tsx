import { observer } from 'mobx-react-lite';
import { FC, useEffect } from 'react';
import { useRootStore } from '../../../utils/RootStoreProvider/useRootStore';
import Table from '../../blocks/table/Table';
import './style.scss';

const Products: FC = observer(() => {
	const { productsStore } = useRootStore();

	useEffect(() => {
		if (productsStore.statusGetProducts === 'pending') {
			productsStore.getProducts();
		}
	}, [productsStore, productsStore.statusGetProducts]);

	return (
		<main className='products'>
			<div className='products__title'>
				<h3 className='products__title-text'>Список товаров</h3>
			</div>
			<div className='products__action'>
				<p className='products__search-text'>Поиск: </p>
				<input type='text' className='products__search-input' />
			</div>

			{productsStore.statusGetProducts === 'done' ? (
				<Table
					data={productsStore.products.data}
					tableHeader={productsStore.products.tableHeader}
					additionalСlasses={'table--products'}
				/>
			) : (
				''
			)}
		</main>
	);
});

export default Products;
