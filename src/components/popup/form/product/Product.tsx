import './style.scss';

import { observer } from 'mobx-react-lite';
import { FC } from 'react';

import imagePlaceholder from '../../../../assets/images/placeholder.jpg';
import { IProductFormData } from '../../../../store/form/product/type';
import { TChangeFieldEvent } from '../../../../types/form/type';
import { useRootStore } from '../../../../utils/RootStoreProvider/useRootStore';
import Button from '../../../blocks/button/Button';
import FormBlock from '../../../blocks/form/block/Block';
import FormFieldInput from '../../../blocks/form/field/input/Input';
import FormFieldSelect from '../../../blocks/form/field/select/Select';
import { ISelectOption } from '../../../blocks/form/field/select/type';
import FormLayout from '../../../blocks/form/layout/Layout';
import WindowHeader from '../../../blocks/windowHeader/WindowHeader';

const PopupFormProduct: FC = observer(() => {
  const { storePopup, storeProductForm } = useRootStore();

  function changeFieldHandler(
    e: TChangeFieldEvent,
    fieldName: keyof IProductFormData,
  ) {
    storeProductForm[fieldName] = e.target.value;
  }

  const SELECT_OPTIONS: Array<ISelectOption> = [
    { id: 1, option: 'Учебная литература (ВУЗ)' },
    { id: 2, option: 'Учебная литература (CУЗ)' },
    { id: 3, option: 'Художественная литература' },
  ];

  function closeWindowHandler() {
    storePopup.hideProductForm();
    storePopup.showTaskForm();
  }

  function addProductHandler() {
    storeProductForm.addProductToList();
    closeWindowHandler();
  }

  return (
    <div className='add-product'>
      <WindowHeader
        text='Добавить партию товара'
        saveEvent={addProductHandler}
        closeEvent={closeWindowHandler}
      />
      <div className='add-product__content-block'>
        <FormLayout additionalСlasses='form-block--article-info'>
          <FormBlock
            titleText='Артикул'
            additionalTitleBlockClasses='form-block__title--big'
          >
            <FormFieldInput
              value={storeProductForm.article}
              changeEvent={(e) => changeFieldHandler(e, 'article')}
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
              value={storeProductForm.title}
              changeEvent={(e) => changeFieldHandler(e, 'title')}
            />
          </FormBlock>
        </FormLayout>

        <FormLayout additionalСlasses='form-block--main-info'>
          <FormBlock titleText='Автор'>
            <FormFieldInput
              value={storeProductForm.author}
              changeEvent={(e) => changeFieldHandler(e, 'author')}
            />
          </FormBlock>
          <FormBlock titleText='Категория'>
            <FormFieldSelect
              value={storeProductForm.categoryId}
              changeEvent={(e) => changeFieldHandler(e, 'categoryId')}
              options={SELECT_OPTIONS}
            />
          </FormBlock>
        </FormLayout>

        <FormLayout additionalСlasses='form-block--second-info'>
          <FormBlock titleText='Год издания'>
            <FormFieldInput
              value={storeProductForm.yearOfPublication}
              changeEvent={(e) => changeFieldHandler(e, 'yearOfPublication')}
            />
          </FormBlock>
          <FormBlock titleText='Количество товаров'>
            <FormFieldInput
              value={storeProductForm.number}
              changeEvent={(e) => changeFieldHandler(e, 'number')}
            />
          </FormBlock>
        </FormLayout>

        <FormLayout additionalСlasses='form-block--other-info'>
          <FormBlock titleText='Дата печати'>
            <FormFieldInput
              value={storeProductForm.printDate}
              changeEvent={(e) => changeFieldHandler(e, 'printDate')}
            />
          </FormBlock>
          <FormBlock titleText='Типография'>
            <FormFieldInput
              value={storeProductForm.printingHouse}
              changeEvent={(e) => changeFieldHandler(e, 'printingHouse')}
            />
          </FormBlock>
          <FormBlock titleText='Издательство'>
            <FormFieldInput
              value={storeProductForm.publishingHouse}
              changeEvent={(e) => changeFieldHandler(e, 'publishingHouse')}
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
