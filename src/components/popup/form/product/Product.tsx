import { observer } from 'mobx-react-lite';
import { FC, useEffect, useState } from 'react';

import imagePlaceholder from '../../../../assets/images/placeholder.jpg';
import { IProductFormFields } from '../../../../store/form/product/list/type';
import { TChangeFieldEvent } from '../../../../types/form/type';
import { useRootStore } from '../../../../utils/RootStoreProvider/useRootStore';
import Button from '../../../blocks/button/Button';
import FormBlock from '../../../blocks/form/block/Block';
import FormField from '../../../blocks/form/field/Field';
import FormFieldInput from '../../../blocks/form/field/input/Input';
import FormFieldPoint from '../../../blocks/form/field/point/Point';
import FormFieldSelect from '../../../blocks/form/field/select/Select';
import FormLayout from '../../../blocks/form/layout/Layout';
import WindowHeaderForm from '../../../blocks/windowHeader/form/Form';

const PopupFormProduct: FC = observer(() => {
  const [isAcceptance, setIsAcceptance] = useState<boolean>(true);
  const { storePopup, storeProduct, storeForm, storeCategory } = useRootStore();

  function changeFieldHandler(
    e: TChangeFieldEvent,
    fieldName: keyof IProductFormFields,
  ) {
    storeForm.product.field.setFormField(fieldName, e.target.value);
  }

  function closeHandler() {
    storePopup.hideProductForm();
    storeForm.state.isDisplayDefaultErrors = false;
    storePopup.showTaskForm();
    storeCategory.fetch.categories();
    storeForm.product.field.clearFormData();
  }

  function saveHandler() {
    if (!storeForm.error.isProductErrors()) {
      storeForm.product.list.addProductToList();
      storeForm.product.field.clearFormData();
      storeForm.product.array.clearArrays('points');
      closeHandler();
    } else {
      storeForm.state.isDisplayDefaultErrors = true;
    }
  }

  function openSelectPointsHandler() {
    storePopup.showSelectPoints();
    storePopup.hideProductForm();
  }

  useEffect(() => {
    storeForm.state.isDisplayDefaultErrors = false;
    storeProduct.status.set('add', 'pending');
  }, []);

  useEffect(() => {
    if (storeForm.state.currentTaskType === 'acceptance') {
      setIsAcceptance(true);
    } else {
      setIsAcceptance(false);
    }
  }, [storeForm.state.currentTaskType]);

  return (
    <div className='popup popup--form popup--form-add-product'>
      <WindowHeaderForm
        title='Добавить партию товара'
        saveEvent={saveHandler}
        closeEvent={closeHandler}
      />
      <div className='popup--form-add-product__content-block'>
        <FormLayout classes='form-block--article-info'>
          <FormBlock
            titleText='Артикул'
            additionalTitleClasses='form-block__title--big'
          >
            <FormField
              errors={storeForm.product.field.getFormErrors('article')}
            >
              <FormFieldInput
                value={storeForm.product.field.getFormField('article')}
                changeHandler={(e) => changeFieldHandler(e, 'article')}
                classes='form-block__input--big'
              />
            </FormField>
            <Button
              classes='button--window-header'
              text='Сгенерировать'
            />
          </FormBlock>
        </FormLayout>

        <FormLayout classes='form-block--title-info'>
          <FormBlock titleText='Название'>
            <FormField errors={storeForm.product.field.getFormErrors('title')}>
              <FormFieldInput
                value={storeForm.product.field.getFormField('title')}
                changeHandler={(e) => changeFieldHandler(e, 'title')}
              />
            </FormField>
          </FormBlock>
        </FormLayout>

        <FormLayout classes='form-block--main-info'>
          <FormBlock titleText='Автор'>
            <FormField errors={storeForm.product.field.getFormErrors('author')}>
              <FormFieldInput
                value={storeForm.product.field.getFormField('author')}
                changeHandler={(e) => changeFieldHandler(e, 'author')}
              />
            </FormField>
          </FormBlock>
          <FormBlock titleText='Категория'>
            <FormField
              errors={storeForm.product.field.getFormErrors('categoryId')}
            >
              <FormFieldSelect
                value={storeForm.product.field.getFormField('categoryId')}
                changeHandler={(e) => changeFieldHandler(e, 'categoryId')}
                options={storeCategory.state.categories}
              />
            </FormField>
          </FormBlock>
        </FormLayout>

        <FormLayout classes='form-block--second-info'>
          <FormBlock titleText='Год издания'>
            <FormField
              errors={storeForm.product.field.getFormErrors(
                'yearOfPublication',
              )}
            >
              <FormFieldInput
                value={storeForm.product.field.getFormField(
                  'yearOfPublication',
                )}
                changeHandler={(e) =>
                  changeFieldHandler(e, 'yearOfPublication')
                }
              />
            </FormField>
          </FormBlock>
          <FormBlock titleText='Количество товаров'>
            <FormField errors={storeForm.product.field.getFormErrors('number')}>
              <FormFieldInput
                value={storeForm.product.field.getFormField('number')}
                changeHandler={(e) => changeFieldHandler(e, 'number')}
              />
            </FormField>
          </FormBlock>
        </FormLayout>

        <FormLayout classes='form-block--other-info'>
          <FormBlock titleText='Дата печати'>
            <FormField
              errors={storeForm.product.field.getFormErrors('printDate')}
            >
              <FormFieldInput
                value={storeForm.product.field.getFormField('printDate')}
                changeHandler={(e) => changeFieldHandler(e, 'printDate')}
              />
            </FormField>
          </FormBlock>
          <FormBlock titleText='Типография'>
            <FormField
              errors={storeForm.product.field.getFormErrors('printingHouse')}
            >
              <FormFieldInput
                value={storeForm.product.field.getFormField('printingHouse')}
                changeHandler={(e) => changeFieldHandler(e, 'printingHouse')}
              />
            </FormField>
          </FormBlock>
          <FormBlock titleText='Издательство'>
            <FormField
              errors={storeForm.product.field.getFormErrors('publishingHouse')}
            >
              <FormFieldInput
                value={storeForm.product.field.getFormField('publishingHouse')}
                changeHandler={(e) => changeFieldHandler(e, 'publishingHouse')}
              />
            </FormField>
          </FormBlock>
        </FormLayout>
        <FormLayout>
          <FormBlock
            titleText={`Точки ${isAcceptance ? 'приёмки' : 'отгрузки'}`}
          >
            <FormField errors={storeForm.product.array.getFormErrors('points')}>
              <FormFieldPoint clickHandler={openSelectPointsHandler} />
            </FormField>
          </FormBlock>
        </FormLayout>
        <div className='popup--form-add-product__photo-block'>
          <img
            src={imagePlaceholder}
            alt=''
            className='popup--form-add-product__photo'
          />
          <p className='popup--form-add-product__photo-text'>
            Фотография товара
          </p>
        </div>
        <div className='popup--form-add-product__empty-block' />
      </div>
    </div>
  );
});

export default PopupFormProduct;
