import './style.scss';

import { observer } from 'mobx-react-lite';
import { FC, useEffect } from 'react';

import imagePlaceholder from '../../../../assets/images/placeholder.jpg';
import { IProductFormFields } from '../../../../store/form/product/list/type';
import { TChangeFieldEvent } from '../../../../types/form/type';
import { useRootStore } from '../../../../utils/RootStoreProvider/useRootStore';
import Button from '../../../blocks/button/Button';
import FormBlock from '../../../blocks/form/block/Block';
import FormField from '../../../blocks/form/field/Field';
import FormFieldInput from '../../../blocks/form/field/input/Input';
import FormFieldSelect from '../../../blocks/form/field/select/Select';
import FormLayout from '../../../blocks/form/layout/Layout';
import WindowHeader from '../../../blocks/windowHeader/WindowHeader';

const PopupFormProduct: FC = observer(() => {
  const {
    storePopup,
    storeFormUtils,
    storeFormState,
    storeFormProductField,
    storeFormProductList,
    storeCategory,
  } = useRootStore();

  function changeFieldHandler(
    e: TChangeFieldEvent,
    fieldName: keyof IProductFormFields,
  ) {
    storeFormProductField.setFormField(fieldName, e.target.value);
  }

  function closeHandler() {
    storeFormProductField.clearFormData();
    storePopup.hideProductForm();
    storePopup.showTaskForm();
    storeFormState.isDisplayDefaultErrors = false;
  }

  function saveHandler() {
    if (!storeFormUtils.checkProductErrors()) {
      storeFormProductList.addProductToList();
      storeFormState.isDisplayDefaultErrors = false;
      closeHandler();
    } else {
      storeFormState.isDisplayDefaultErrors = true;
      alert('Тут должно быть окно с предупреждением');
    }
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
            <FormField errors={storeFormProductField.getFormErrors('article')}>
              <FormFieldInput
                value={storeFormProductField.getFormField('article')}
                changeHandler={(e) => changeFieldHandler(e, 'article')}
                additionalСlasses='form-block__input--big'
              />
            </FormField>
            <Button
              additionalСlasses='button--window-header'
              text='Сгенерировать'
            />
          </FormBlock>
        </FormLayout>

        <FormLayout additionalСlasses='form-block--title-info'>
          <FormBlock titleText='Название'>
            <FormField errors={storeFormProductField.getFormErrors('title')}>
              <FormFieldInput
                value={storeFormProductField.getFormField('title')}
                changeHandler={(e) => changeFieldHandler(e, 'title')}
              />
            </FormField>
          </FormBlock>
        </FormLayout>

        <FormLayout additionalСlasses='form-block--main-info'>
          <FormBlock titleText='Автор'>
            <FormField errors={storeFormProductField.getFormErrors('author')}>
              <FormFieldInput
                value={storeFormProductField.getFormField('author')}
                changeHandler={(e) => changeFieldHandler(e, 'author')}
              />
            </FormField>
          </FormBlock>
          <FormBlock titleText='Категория'>
            <FormField
              errors={storeFormProductField.getFormErrors('categoryId')}
            >
              <FormFieldSelect
                value={storeFormProductField.getFormField('categoryId')}
                changeHandler={(e) => changeFieldHandler(e, 'categoryId')}
                options={storeCategory.categories}
              />
            </FormField>
          </FormBlock>
        </FormLayout>

        <FormLayout additionalСlasses='form-block--second-info'>
          <FormBlock titleText='Год издания'>
            <FormField
              errors={storeFormProductField.getFormErrors('yearOfPublication')}
            >
              <FormFieldInput
                value={storeFormProductField.getFormField('yearOfPublication')}
                changeHandler={(e) =>
                  changeFieldHandler(e, 'yearOfPublication')
                }
              />
            </FormField>
          </FormBlock>
          <FormBlock titleText='Количество товаров'>
            <FormField errors={storeFormProductField.getFormErrors('number')}>
              <FormFieldInput
                value={storeFormProductField.getFormField('number')}
                changeHandler={(e) => changeFieldHandler(e, 'number')}
              />
            </FormField>
          </FormBlock>
        </FormLayout>

        <FormLayout additionalСlasses='form-block--other-info'>
          <FormBlock titleText='Дата печати'>
            <FormField
              errors={storeFormProductField.getFormErrors('printDate')}
            >
              <FormFieldInput
                value={storeFormProductField.getFormField('printDate')}
                changeHandler={(e) => changeFieldHandler(e, 'printDate')}
              />
            </FormField>
          </FormBlock>
          <FormBlock titleText='Типография'>
            <FormField
              errors={storeFormProductField.getFormErrors('printingHouse')}
            >
              <FormFieldInput
                value={storeFormProductField.getFormField('printingHouse')}
                changeHandler={(e) => changeFieldHandler(e, 'printingHouse')}
              />
            </FormField>
          </FormBlock>
          <FormBlock titleText='Издательство'>
            <FormField
              errors={storeFormProductField.getFormErrors('publishingHouse')}
            >
              <FormFieldInput
                value={storeFormProductField.getFormField('publishingHouse')}
                changeHandler={(e) => changeFieldHandler(e, 'publishingHouse')}
              />
            </FormField>
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
