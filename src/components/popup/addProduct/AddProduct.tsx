import { observer } from 'mobx-react-lite';
import { FC, useCallback } from 'react';

import { useRootStore } from '../../../utils/RootStoreProvider/useRootStore';
import imagePlaceholder from '../../../assets/images/placeholder.jpg';
import Button from '../../blocks/button/Button';
import FormBlock from '../../blocks/form/block/Block';
import FormFieldInput from '../../blocks/form/field/input/Input';
import FormFieldSelect from '../../blocks/form/field/select/Select';
import { ISelectOptions } from '../../blocks/form/field/select/type';
import FormLayout from '../../blocks/form/layout/Layout';
import WindowHeader from '../../blocks/windowHeader/WindowHeader';
import './style.scss';
import { TChangeFieldEvent } from '../../../store/form/addTaskForm/type';
import { IAddProductFormData } from '../../../store/form/addProductForm/type';

const AddProduct: FC = observer(() => {
  const { popupStore, addProductFormStore } = useRootStore();

  function changeFieldHandler(
    e: TChangeFieldEvent,
    fieldName: keyof IAddProductFormData,
  ) {
    addProductFormStore[fieldName] = e.target.value;
  }

  const SELECT_OPTIONS: Array<ISelectOptions> = [
    { id: 1, option: 'Учебная литература (ВУЗ)' },
    { id: 2, option: 'Учебная литература (CУЗ)' },
    { id: 3, option: 'Художественная литература' },
  ];

  const hideAddProductWindowHandler = useCallback(() => {
    popupStore.hideAddProductWindow();
    popupStore.showAddTaskWindow();
  }, [popupStore]);

  function addProductHandler() {
    addProductFormStore.addProductToList();
    hideAddProductWindowHandler();
  }

  return (
    <div className='add-product'>
      <WindowHeader text='Добавить партию товара'>
        <Button
          additionalСlasses='button--window-header'
          text='Сохранить'
          onClick={addProductHandler}
        />
        <Button
          additionalСlasses='button--window-header'
          text='Отмена'
          onClick={hideAddProductWindowHandler}
        />
      </WindowHeader>
      <div className='add-product__content-block'>
        <FormLayout additionalСlasses='properties-block--article-info'>
          <FormBlock
            titleText='Артикул'
            additionalTitleBlockClasses='properties-block__title--big'
          >
            <FormFieldInput
              value={addProductFormStore.article}
              changeEvent={(e) => changeFieldHandler(e, 'article')}
              additionalСlasses='properties-block__input--big'
            />
            <Button
              additionalСlasses='button--window-header'
              text='Сгенерировать'
            />
          </FormBlock>
        </FormLayout>

        <FormLayout additionalСlasses='properties-block--title-info'>
          <FormBlock titleText='Название'>
            <FormFieldInput
              value={addProductFormStore.title}
              changeEvent={(e) => changeFieldHandler(e, 'title')}
            />
          </FormBlock>
        </FormLayout>

        <FormLayout additionalСlasses='properties-block--main-info'>
          <FormBlock titleText='Автор'>
            <FormFieldInput
              value={addProductFormStore.author}
              changeEvent={(e) => changeFieldHandler(e, 'author')}
            />
          </FormBlock>
          <FormBlock titleText='Категория'>
            <FormFieldSelect
              value={addProductFormStore.categoryId}
              changeEvent={(e) => changeFieldHandler(e, 'categoryId')}
              options={SELECT_OPTIONS}
            />
          </FormBlock>
        </FormLayout>

        <FormLayout additionalСlasses='properties-block--second-info'>
          <FormBlock titleText='Год издания'>
            <FormFieldInput
              value={addProductFormStore.yearOfPublication}
              changeEvent={(e) => changeFieldHandler(e, 'yearOfPublication')}
            />
          </FormBlock>
          <FormBlock titleText='Количество товаров'>
            <FormFieldInput
              value={addProductFormStore.number}
              changeEvent={(e) => changeFieldHandler(e, 'number')}
            />
          </FormBlock>
        </FormLayout>

        <FormLayout additionalСlasses='properties-block--other-info'>
          <FormBlock titleText='Дата печати'>
            <FormFieldInput
              value={addProductFormStore.printDate}
              changeEvent={(e) => changeFieldHandler(e, 'printDate')}
            />
          </FormBlock>
          <FormBlock titleText='Типография'>
            <FormFieldInput
              value={addProductFormStore.printingHouse}
              changeEvent={(e) => changeFieldHandler(e, 'printingHouse')}
            />
          </FormBlock>
          <FormBlock titleText='Издательство'>
            <FormFieldInput
              value={addProductFormStore.publishingHouse}
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

export default AddProduct;
