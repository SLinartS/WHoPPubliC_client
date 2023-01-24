import { observer } from 'mobx-react-lite';
import { FC, MouseEvent, ReactNode, useEffect } from 'react';

import addIcon from '../../../assets/icons/add.svg';
import deleteIcon from '../../../assets/icons/delete.svg';
import editIcon from '../../../assets/icons/edit.svg';
import filterIcon from '../../../assets/icons/sliders.svg';
import { useRootStore } from '../../../utils/RootStoreProvider/useRootStore';
import ButtonIcon from '../../blocks/buttonIcon/ButtonIcon';
import Loader from '../../blocks/loader/Loader';
import SearchField from '../../blocks/searchField/SearchField';
import Table from '../../blocks/table/Table';
import { useChangeProduct } from '../hooks/change/useChangeProduct';
import { useDeleteController } from '../hooks/delete/useDeleteController';
import { useGetSelects } from '../hooks/product/useGetSelects';
import PopupFilter from './popupFilter/PopupFilter';

const Products: FC = observer(() => {
  const { storeProduct, storePopup, storeTable, storeState } = useRootStore();
  const deleteControllerHook = useDeleteController();
  const changeProductHook = useChangeProduct();
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
    changeProductHook();
  }

  function deleteHandler() {
    deleteControllerHook(
      'products',
      'products',
      'Выберите строку, чтобы удалить партию продуктов',
    );
  }

  function displaySelects(): ReactNode[] {
    return getSelectsHook();
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
            keyWord='article'
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
        <div className='products__select'>{displaySelects()}</div>
      ) : (
        <Loader classes='loader--product-select' />
      )}

      {storeState.interface.getIsShowPopupFilter() ? <PopupFilter /> : ''}
    </main>
  );
});

export default Products;
