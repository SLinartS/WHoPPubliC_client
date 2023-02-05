import './style.scss';

import addIcon from '@assets/icons/add.svg';
import deleteIcon from '@assets/icons/delete.svg';
import editIcon from '@assets/icons/edit.svg';
import filterIcon from '@assets/icons/sliders.svg';
import ButtonIcon from '@components/buttonIcon/ButtonIcon';
import Loader from '@components/loader/Loader';
import SearchField from '@components/searchField/SearchField';
import Table from '@components/table/Table';
import { useRootStore } from '@helpers/RootStoreProvider/useRootStore';
import { useFetchOneProductAndFillForm } from '@hooks/product/useFetchOneProductAndFillForm';
import { useGetSelects } from '@hooks/product/useGetSelects';
import { observer } from 'mobx-react-lite';
import { FC, MouseEvent, useEffect } from 'react';

import { useDeleteController } from '../hooks/delete/useDeleteController';
import PopupFilter from './popupFilter/PopupFilter';

const Products: FC = () => {
  const { storeProduct, storePopup, storeTable, storeState } = useRootStore();
  const deleteControllerHook = useDeleteController();
  const fetchOneProductAndFillFormHook = useFetchOneProductAndFillForm();
  const getSelectsHook = useGetSelects();

  function addHandler() {
    storePopup.form.state.formActionType = 'create';
    storePopup.status.show('formProduct');
  }

  function showPopupFilterHandler(e: MouseEvent<HTMLDivElement>) {
    e.stopPropagation();
    storeState.interface.showPopupFilter();
  }

  function changeHandler(): void {
    storePopup.form.state.formActionType = 'change';
    fetchOneProductAndFillFormHook(
      'formProduct',
      'Выберите строку, чтобы изменить партию продуктов',
    );
  }

  function deleteHandler() {
    deleteControllerHook(
      'products',
      'products',
      'Выберите строку, чтобы удалить партию продуктов',
    );
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
        {storeState.user.userData.role !== 'worker' && (
          <>
            <ButtonIcon
              src={addIcon}
              clickHandler={addHandler}
              alt='add'
            />
            <ButtonIcon
              src={editIcon}
              clickHandler={changeHandler}
              alt='change'
            />
            <ButtonIcon
              src={deleteIcon}
              clickHandler={deleteHandler}
              alt='delete'
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
            valuesType='products'
            selectingValues='products'
            classes='table--products'
            displayedColumns={storeTable.utils.getColumnsWithMark('products')}
          />
        ) : (
          <Loader classes='loader--product-table' />
        )}
      </div>

      {storeProduct.status.get('fetch') === 'done' ? (
        <div className='products__select'>{getSelectsHook()}</div>
      ) : (
        <Loader classes='loader--product-select' />
      )}

      {storeState.interface.getIsShowPopupFilter() ? <PopupFilter /> : ''}
    </main>
  );
};

export default observer(Products);
