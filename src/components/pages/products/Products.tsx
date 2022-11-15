import './style.scss';

import { observer } from 'mobx-react-lite';
import { FC, useEffect } from 'react';

import { useRootStore } from '../../../utils/RootStoreProvider/useRootStore';
import Loader from '../../blocks/loader/Loader';
import Table from '../../blocks/table/Table';

const Products: FC = observer(() => {
  const { storeProduct } = useRootStore();

  useEffect(() => {
    if (storeProduct.status.get('fetch') === 'pending') {
      storeProduct.fetch.products();
    }
  }, [storeProduct.status.get('fetch')]);

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

      {storeProduct.status.get('fetch') === 'done' ? (
        <Table
          data={storeProduct.state.products.data}
          keyWord='article'
          tableHeader={storeProduct.state.products.tableHeader}
          additionalСlasses='table--products'
        />
      ) : (
        <Loader />
      )}
    </main>
  );
});

export default Products;
