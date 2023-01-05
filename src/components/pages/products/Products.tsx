import { observer } from 'mobx-react-lite';
import { FC, useEffect } from 'react';

import addIcon from '../../../assets/icons/add.svg';
import deleteIcon from '../../../assets/icons/delete.svg';
import editIcon from '../../../assets/icons/edit.svg';
import { ISelectedItems } from '../../../store/table/selectedItem/type';
import { useRootStore } from '../../../utils/RootStoreProvider/useRootStore';
import Loader from '../../blocks/loader/Loader';
import SearchField from '../../blocks/searchField/SearchField';
import SelectTable from '../../blocks/selectTable/SelectTable';
import Table from '../../blocks/table/Table';

const Products: FC = observer(() => {
  const { storeProduct, storePopup, storeTable, storeAction } = useRootStore();

  function openProductFormHandler() {
    storePopup.form.state.formActionType = 'create';
    storePopup.status.showProductForm();
  }

  function changeProduct(): void {
    storePopup.form.state.formActionType = 'change';
    const productId = storeTable.selectedItem.getItemId('products');

    if (productId === 0) {
      storePopup.windows.information.setting = {
        text: 'Выберите строку, чтобы её изменить',
      };
      storePopup.status.showWindowInformation();
    } else {
      storeProduct.fetch.oneProduct(productId, () => {
        storePopup.status.showProductForm();
      });
    }
  }

  function deleteHandler(itemType: keyof ISelectedItems) {
    storeAction.delete.deleteController(itemType);
  }

  useEffect(() => {
    if (storeProduct.status.get('fetch') === 'pending') {
      storeProduct.fetch.products(() => {
        storeTable.utils.setDefaulMark(
          'products',
          storeProduct.state.products.data,
        );
      });
    }
  }, [storeProduct.status.get('fetch')]);

  return (
    <main className='products'>
      <div className='products__section-button'>
        <SearchField classes='search-field--products' />
        <img
          className='products__icon'
          src={addIcon}
          alt='add'
          onClick={openProductFormHandler}
        />
        <img
          className='products__icon'
          src={editIcon}
          alt='add'
          onClick={changeProduct}
        />
        <img
          className='products__icon'
          src={deleteIcon}
          alt='add'
          onClick={() => deleteHandler('products')}
        />
      </div>
      <div className='products__table'>
        {storeProduct.status.get('fetch') === 'done' ? (
          <Table
            data={storeProduct.state.products.data}
            keyWord='article'
            valuesType='products'
            classes='table--products'
            displayedColumns={storeTable.utils.getColumnsWithMark('products')}
          />
        ) : (
          <Loader />
        )}
      </div>
      <div className='products__select'>
        {storeProduct.status.get('fetch') === 'done' ? (
          Object.entries(
            storeProduct.state.products.data[
              storeTable.selectedItem.getItemId('products') - 1
            ],
          ).map(([key, item]) => (
            <SelectTable
              key={key + item.value + item.alias}
              checkMarkValue={key}
              alias={item.alias}
              value={String(item.value)}
              mark='products'
            />
          ))
        ) : (
          <Loader />
        )}
      </div>
    </main>
  );
});

export default Products;
