import { observer } from 'mobx-react-lite';
import { FC, MouseEvent, ReactNode, useEffect } from 'react';

import addIcon from '../../../assets/icons/add.svg';
import deleteIcon from '../../../assets/icons/delete.svg';
import editIcon from '../../../assets/icons/edit.svg';
import filterIcon from '../../../assets/icons/sliders.svg';
import { useRootStore } from '../../../utils/RootStoreProvider/useRootStore';
import Loader from '../../blocks/loader/Loader';
import SearchField from '../../blocks/searchField/SearchField';
import SelectTable from '../../blocks/selectTable/SelectTable';
import Table from '../../blocks/table/Table';
import { useChangeProduct } from '../hooks/change/useChangeProduct';
import { useDeleteController } from '../hooks/delete/useDeleteController';
import PopupFilter from './popupFilter/PopupFilter';

const Products: FC = observer(() => {
  const { storeProduct, storePopup, storeTable, storeState } = useRootStore();
  const deleteControllerHook = useDeleteController();
  const changeProductHook = useChangeProduct();

  function openProductFormHandler() {
    storePopup.form.state.formActionType = 'create';
    storePopup.status.show('formProduct');
  }

  function showPopupFilterHandler(e: MouseEvent<HTMLDivElement>) {
    e.stopPropagation();
    storeState.interface.showPopupFilter();
  }

  function changeProduct(): void {
    storePopup.form.state.formActionType = 'change';
    changeProductHook();
  }

  function deleteHandler() {
    deleteControllerHook('products', 'products');
  }

  function getDataForSelects() {
    const numberProductsWithSelectedId =
      storeProduct.state.products.data.filter(
        (product) =>
          product.id.value ===
          storeTable.selectedItem.getItemId('products', 'products'),
      ).length;

    if (numberProductsWithSelectedId) {
      return Object.entries(
        storeProduct.state.products.data.filter(
          (product) =>
            product.id.value ===
            storeTable.selectedItem.getItemId('products', 'products'),
        )[0],
      );
    }
    return Object.entries(storeProduct.state.products.data[0]);
  }

  function displaySelects(): ReactNode[] {
    const selectNodes: ReactNode[] = [];
    if (storeProduct.state.products.data[0]) {
      selectNodes.push(
        getDataForSelects().map(([key, item]) => (
          <SelectTable
            key={key + item.value + item.alias}
            checkMarkValue={key}
            alias={item.alias}
            value={String(item.value)}
            mark='products'
          />
        )),
      );
    } else {
      selectNodes.push(<p>Отсутствуют данные</p>);
    }
    return selectNodes;
  }

  useEffect(() => {
    if (storeProduct.status.get('fetch') === 'pending') {
      storeProduct.fetch.products(() => {
        storeTable.utils.setDefaulMark(
          'products',
          storeProduct.state.products.data,
          ['categoryId', 'printingHouse'],
        );
      });
    }
  }, [storeProduct.status.get('fetch')]);

  return (
    <main className='products'>
      <div className='products__section-button'>
        <SearchField classes='search-field--products' />
        {storeState.user.getUserData().role !== 'worker' && (
          <>
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
              onClick={deleteHandler}
            />
          </>
        )}
      </div>
      <div
        className='products__filters'
        onClick={showPopupFilterHandler}
      >
        <img
          src={filterIcon}
          alt='filters'
          className='products__filters-icon'
        />
        <p className='products__filters-text'>Фильтры</p>
      </div>

      <div className='products__table'>
        {storeProduct.status.get('fetch') === 'done' ? (
          <Table
            data={storeProduct.state.products.data}
            keyWord='article'
            valuesType='products'
            selectingValues='products'
            classes='table--products'
            displayedColumns={storeTable.utils.getColumnsWithMark('products')}
          />
        ) : (
          <Loader />
        )}
      </div>
      <div className='products__select'>
        {storeProduct.status.get('fetch') === 'done' ? (
          displaySelects()
        ) : (
          <Loader />
        )}
      </div>
      {storeState.interface.getIsShowPopupFilter() ? <PopupFilter /> : ''}
    </main>
  );
});

export default Products;
