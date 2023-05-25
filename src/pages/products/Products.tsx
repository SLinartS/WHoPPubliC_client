import './style.scss';

import addIcon from '@assets/icons/add/add-second.svg';
import deleteIcon from '@assets/icons/delete/delete-second.svg';
import editIcon from '@assets/icons/edit/edit-second.svg';
import filterIcon from '@assets/icons/sliders/sliders-white.svg';
import ButtonIcon from '@components/buttonIcon/ButtonIcon';
import AssembledBlockFieldSelect from '@components/form/assembled/BlockFieldSelect';
import LoaderWrapper from '@components/loader/wrapper/Wrapper';
import SearchField from '@components/searchField/SearchField';
import Table from '@components/table/Table';
import { useRootStore } from '@helpers/RootStoreProvider/useRootStore';
import { useFetchOneProductAndFillForm } from '@hooks/product/useFetchOneProductAndFillForm';
import { useGetSelects } from '@hooks/product/useGetSelects';
import { IOption } from '@store/category/type';
import { TProductTypes } from '@store/productType/type';
import { observer } from 'mobx-react-lite';
import { FC, MouseEvent, useEffect, useMemo, useState } from 'react';

import { useDeleteController } from '../hooks/delete/useDeleteController';
import PopupFilter from './popupFilter/PopupFilter';

const Products: FC = () => {
  const {
    storeProduct,
    storePopup,
    storeTable,
    storeState,
    storeAuth,
    storeProductType,
  } = useRootStore();
  const deleteController = useDeleteController();
  const fetchOneProductAndFillForm = useFetchOneProductAndFillForm();
  const getSelects = useGetSelects();
  const [selectedProductType, setSelectedProductType] = useState<number>(1);

  function addHandler() {
    storePopup.form.state.formActionType = 'create';
    storePopup.status.show('formProduct');
  }

  function searchHandler(newValue: string) {
    storeProduct.action.fetch(newValue);
  }

  function showPopupFilterHandler(e: MouseEvent<HTMLDivElement>) {
    e.stopPropagation();
    storeState.interface.showPopupFilter();
  }

  function changeSelectHandler(option: IOption<TProductTypes>) {
    setSelectedProductType(option.id);
  }

  const currentProductType = useMemo((): IOption<TProductTypes> => {
    const id = selectedProductType;
    const productType = storeProductType.state.productTypes.find(
      (type) => type.id === id,
    );
    if (productType) {
      return productType;
    }
    return { id, title: 'book', alias: '' };
  }, [selectedProductType, storeProductType.status.get('fetch')]);

  const displayedProductData = useMemo(() => {
    switch (selectedProductType) {
      case 1:
        return storeProduct.state.products.data.filter(
          (product) => product.typeId.value === 1,
        );
      case 2:
        return storeProduct.state.products.data.filter(
          (product) => product.typeId.value === 2,
        );
      case 3:
        return storeProduct.state.products.data.filter(
          (product) => product.typeId.value === 3,
        );
      default:
        return storeProduct.state.products.data;
    }
  }, [selectedProductType, storeProduct.state.products.data]);

  function changeHandler(): void {
    storePopup.form.state.formActionType = 'update';
    fetchOneProductAndFillForm(
      'formProduct',
      'Выберите строку, чтобы изменить партию продуктов',
    );
  }

  function deleteHandler() {
    deleteController(
      'products',
      'products',
      'Выберите строку, чтобы удалить партию продуктов',
    );
  }

  useEffect(() => {
    if (storeProduct.status.get('fetch') === 'pending') {
      storeProduct.action.fetch('', () => {
        storeTable.utils.setDefaultMark(
          'products',
          storeProduct.state.products.data,
          [
            'categoryId',
            'typeId',
            'typeAlias',
            'note',
            'printingHouse',
            'imageUrl',
          ],
        );
      });
    }
  }, [storeProduct.status.get('fetch')]);

  useEffect(() => {
    storeProductType.action.fetch();
  }, []);

  return (
    <main className='products'>
      <div className='products__section-button'>
        <SearchField
          searchHandler={searchHandler}
          classes='search-field--products'
        />
        {storeAuth.state.userData.role !== 'worker' && (
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
        <div className='products__menu'>
          <AssembledBlockFieldSelect
            options={storeProductType.state.productTypes}
            errors={[]}
            changeHandler={changeSelectHandler}
            currentOption={currentProductType}
            typeForm='product-menu'
            fieldName='productType'
            titleText='Тип товара'
          />
        </div>
        <LoaderWrapper status={storeProduct.status.get('fetch')}>
          <Table
            data={displayedProductData}
            valuesType='products'
            selectingValues='products'
            displayedColumns={storeTable.utils.getColumnsWithMark('products')}
          />
        </LoaderWrapper>
      </div>

      <LoaderWrapper status={storeProduct.status.get('fetch')}>
        <div className='products__select'>{getSelects()}</div>
      </LoaderWrapper>

      {storeState.interface.getIsShowPopupFilter() ? <PopupFilter /> : ''}
    </main>
  );
};

export default observer(Products);
