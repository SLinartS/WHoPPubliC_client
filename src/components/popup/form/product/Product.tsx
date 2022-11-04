import './style.scss';

import { observer } from 'mobx-react-lite';
import { FC, useEffect } from 'react';

import imagePlaceholder from '../../../../assets/images/placeholder.jpg';
import { IProductFormData } from '../../../../store/form/product/type';
import { TChangeFieldEvent } from '../../../../types/form/type';
import { useRootStore } from '../../../../utils/RootStoreProvider/useRootStore';
import Button from '../../../blocks/button/Button';
import FormBlock from '../../../blocks/form/block/Block';
import FormFieldInput from '../../../blocks/form/field/input/Input';
import FormFieldSelect from '../../../blocks/form/field/select/Select';
import FormLayout from '../../../blocks/form/layout/Layout';
import WindowHeader from '../../../blocks/windowHeader/WindowHeader';

const PopupFormProduct: FC = observer(() => {
  const { storePopup, storeFormProduct, storeCategory } = useRootStore();

  function changeFieldHandler(
    e: TChangeFieldEvent,
    fieldName: keyof IProductFormData,
  ) {
    storeFormProduct[fieldName] = e.target.value;
  }

  function closeHandler() {
    storeFormProduct.clearFormData();
    storePopup.hideProductForm();
    storePopup.showTaskForm();
  }

  function saveHandler() {
    storeFormProduct.addProductToList();
    closeHandler();
  }

  useEffect(() => {
    if (storeCategory.statusFetchCategories === 'pending') {
      storeCategory.fetchCategories();
    }
  });

  return (
    <div className='popup add-product'>
      <WindowHeader
        text='Добавить партию товара'
        saveEvent={saveHandler}
        closeEvent={closeHandler}
      />
      <div className='add-product__content-block'>
        <FormLayout additionalСlasses='form-block--article-info'>
          <FormBlock
            titleText='Артикул'
            additionalTitleClasses='form-block__title--big'
          >
            <FormFieldInput
              value={storeFormProduct.article}
              changeHandler={(e) => changeFieldHandler(e, 'article')}
              additionalСlasses='form-block__input--big'
            />
            <Button
              additionalСlasses='button--window-header'
              text='Сгенерировать'
            />
          </FormBlock>
        </FormLayout>

        <FormLayout additionalСlasses='form-block--title-info'>
          <FormBlock titleText='Название'>
            <FormFieldInput
              value={storeFormProduct.title}
              changeHandler={(e) => changeFieldHandler(e, 'title')}
            />
          </FormBlock>
        </FormLayout>

        <FormLayout additionalСlasses='form-block--main-info'>
          <FormBlock titleText='Автор'>
            <FormFieldInput
              value={storeFormProduct.author}
              changeHandler={(e) => changeFieldHandler(e, 'author')}
            />
          </FormBlock>
          <FormBlock titleText='Категория'>
            <FormFieldSelect
              value={storeFormProduct.categoryId}
              changeHandler={(e) => changeFieldHandler(e, 'categoryId')}
              options={storeCategory.categories}
            />
          </FormBlock>
        </FormLayout>

        <FormLayout additionalСlasses='form-block--second-info'>
          <FormBlock titleText='Год издания'>
            <FormFieldInput
              value={storeFormProduct.yearOfPublication}
              changeHandler={(e) => changeFieldHandler(e, 'yearOfPublication')}
            />
          </FormBlock>
          <FormBlock titleText='Количество товаров'>
            <FormFieldInput
              value={storeFormProduct.number}
              changeHandler={(e) => changeFieldHandler(e, 'number')}
            />
          </FormBlock>
        </FormLayout>

        <FormLayout additionalСlasses='form-block--other-info'>
          <FormBlock titleText='Дата печати'>
            <FormFieldInput
              value={storeFormProduct.printDate}
              changeHandler={(e) => changeFieldHandler(e, 'printDate')}
            />
          </FormBlock>
          <FormBlock titleText='Типография'>
            <FormFieldInput
              value={storeFormProduct.printingHouse}
              changeHandler={(e) => changeFieldHandler(e, 'printingHouse')}
            />
          </FormBlock>
          <FormBlock titleText='Издательство'>
            <FormFieldInput
              value={storeFormProduct.publishingHouse}
              changeHandler={(e) => changeFieldHandler(e, 'publishingHouse')}
            />
          </FormBlock>
        </FormLayout>

        <div className='add-product__photo-block'>
          <img
            src={imagePlaceholder}
            alt=''
            className='add-product__photo'
          />
          <p className='add-product__photo-text'>Фотография товара</p>
        </div>
        <div className='add-product__empty-block' />
      </div>
    </div>
  );
});

export default PopupFormProduct;
