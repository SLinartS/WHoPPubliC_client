import { observer } from 'mobx-react-lite';
import { FC, useEffect, useState } from 'react';

import imagePlaceholder from '../../../../assets/images/placeholder.jpg';
import { IProductFormFields } from '../../../../store/popup/form/productList/type';
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
  const { storePopup, storeProduct, storeCategory } = useRootStore();

  function changeFieldHandler(
    e: TChangeFieldEvent,
    fieldName: keyof IProductFormFields,
  ) {
    storePopup.form.product.setFormField(fieldName, e.target.value);
  }

  function closeHandler() {
    storePopup.status.hideProductForm();
    storeProduct.fetch.products();
    storePopup.form.product.clearFormData();
  }

  function saveHandler() {
    if (!storePopup.form.utils.error.isProductErrors()) {
      storeProduct.add.products(() => {
        storePopup.form.product.clearFormData();
        storePopup.select.points.clearArray();
        closeHandler();
      });
    } else {
      storePopup.form.state.isDisplayDefaultErrors = true;
    }
  }

  function openSelectPointsHandler() {
    storePopup.status.showSelectPoints();
    storePopup.status.hideProductForm();
  }

  useEffect(() => {
    storePopup.form.state.isDisplayDefaultErrors = false;
    storeProduct.status.set('add', 'pending');
  }, []);

  useEffect(() => {
    if (storePopup.form.state.currentTaskType === 'acceptance') {
      setIsAcceptance(true);
    } else {
      setIsAcceptance(false);
    }
  }, [storePopup.form.state.currentTaskType]);

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
              errors={storePopup.form.product.getFormErrors('article')}
            >
              <FormFieldInput
                value={storePopup.form.product.getFormField('article')}
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
            <FormField errors={storePopup.form.product.getFormErrors('title')}>
              <FormFieldInput
                value={storePopup.form.product.getFormField('title')}
                changeHandler={(e) => changeFieldHandler(e, 'title')}
              />
            </FormField>
          </FormBlock>
        </FormLayout>

        <FormLayout classes='form-block--main-info'>
          <FormBlock titleText='Автор'>
            <FormField errors={storePopup.form.product.getFormErrors('author')}>
              <FormFieldInput
                value={storePopup.form.product.getFormField('author')}
                changeHandler={(e) => changeFieldHandler(e, 'author')}
              />
            </FormField>
          </FormBlock>
          <FormBlock titleText='Категория'>
            <FormField
              errors={storePopup.form.product.getFormErrors('categoryId')}
            >
              <FormFieldSelect
                value={storePopup.form.product.getFormField('categoryId')}
                changeHandler={(e) => changeFieldHandler(e, 'categoryId')}
                options={storeCategory.state.categories}
              />
            </FormField>
          </FormBlock>
        </FormLayout>

        <FormLayout classes='form-block--second-info'>
          <FormBlock titleText='Год издания'>
            <FormField
              errors={storePopup.form.product.getFormErrors(
                'yearOfPublication',
              )}
            >
              <FormFieldInput
                value={storePopup.form.product.getFormField(
                  'yearOfPublication',
                )}
                changeHandler={(e) =>
                  changeFieldHandler(e, 'yearOfPublication')
                }
              />
            </FormField>
          </FormBlock>
          <FormBlock titleText='Количество товаров'>
            <FormField errors={storePopup.form.product.getFormErrors('number')}>
              <FormFieldInput
                value={storePopup.form.product.getFormField('number')}
                changeHandler={(e) => changeFieldHandler(e, 'number')}
              />
            </FormField>
          </FormBlock>
        </FormLayout>

        <FormLayout classes='form-block--other-info'>
          <FormBlock titleText='Дата печати'>
            <FormField
              errors={storePopup.form.product.getFormErrors('printDate')}
            >
              <FormFieldInput
                value={storePopup.form.product.getFormField('printDate')}
                changeHandler={(e) => changeFieldHandler(e, 'printDate')}
              />
            </FormField>
          </FormBlock>
          <FormBlock titleText='Типография'>
            <FormField
              errors={storePopup.form.product.getFormErrors('printingHouse')}
            >
              <FormFieldInput
                value={storePopup.form.product.getFormField('printingHouse')}
                changeHandler={(e) => changeFieldHandler(e, 'printingHouse')}
              />
            </FormField>
          </FormBlock>
          <FormBlock titleText='Издательство'>
            <FormField
              errors={storePopup.form.product.getFormErrors('publishingHouse')}
            >
              <FormFieldInput
                value={storePopup.form.product.getFormField('publishingHouse')}
                changeHandler={(e) => changeFieldHandler(e, 'publishingHouse')}
              />
            </FormField>
          </FormBlock>
        </FormLayout>
        <FormLayout>
          <FormBlock
            titleText={`Точки ${isAcceptance ? 'приёмки' : 'отгрузки'}`}
          >
            <FormField errors={storePopup.select.points.arrayErrors}>
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
