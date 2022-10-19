import { FC } from 'react';
import Table from '../tasks/table/Table';

const Products: FC = () => {
	return (
		<main className='products'>
			<div className='products__title'>
				<h3 className='products__title-text'>Список товаров</h3>
			</div>
			{/* <Table /> */}
		</main>
	);
};

export default Products;
