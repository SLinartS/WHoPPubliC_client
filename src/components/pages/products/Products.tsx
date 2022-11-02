import './style.scss';

import { observer } from 'mobx-react-lite';
import { FC, useEffect } from 'react';

import { useRootStore } from '../../../utils/RootStoreProvider/useRootStore';
import Table from '../../blocks/table/Table';

const Products: FC = observer(() => {
  const { storeProduct } = useRootStore();

  useEffect(() => {
    if (storeProduct.statusFetchProducts === 'pending') {
      storeProduct.fetchProducts();
    }
  }, [storeProduct, storeProduct.statusFetchProducts]);

  return (
    <main className='products'>
      <div className='products__title'>
        <h3 className='products__title-text'>Список товаров</h3>
      </div>
      <div className='products__action'>
        <p className='products__search-text'>Поиск: </p>
        <input
          type='text'
          className='products__search-input'
        />
      </div>

      {storeProduct.statusFetchProducts === 'done' ? (
        <Table
          data={storeProduct.products.data}
          tableHeader={storeProduct.products.tableHeader}
          additionalСlasses='table--products'
        />
      ) : (
        ''
      )}
    </main>
  );
});

export default Products;
