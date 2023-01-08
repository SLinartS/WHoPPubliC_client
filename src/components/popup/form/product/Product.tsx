import { observer } from 'mobx-react-lite';
import { FC, useEffect } from 'react';

import imagePlaceholder from '../../../../assets/images/placeholder.png';
import { useRootStore } from '../../../../utils/RootStoreProvider/useRootStore';
import AssembledBlockFieldInput from '../../../blocks/form/assembled/BlockFieldInput';
import AssembledBlockFieldSelect from '../../../blocks/form/assembled/BlockFieldSelect';
import AssembledBlockFieldText from '../../../blocks/form/assembled/BlockFieldText';
import FormBlock from '../../../blocks/form/block/Block';
import FormBlockTitle from '../../../blocks/form/block/title/Title';
import FormField from '../../../blocks/form/field/Field';
import FormFieldPoint from '../../../blocks/form/field/point/Point';
import FormLayout from '../../../blocks/form/layout/Layout';
import WindowHeaderForm from '../../../blocks/windowHeader/form/Form';

const PopupFormProduct: FC = observer(() => {
  const { storePopup, storeProduct, storeCategory } = useRootStore();

  function closeHandler() {
    storePopup.status.hideProductForm();
    storeProduct.fetch.products();
    storePopup.form.product.clearFormData();
  }

  function saveHandler() {
    const { formActionType } = storePopup.form.state;

    if (formActionType === 'create') {
      storePopup.form.product.setFormField('id', '0');
    }
    if (!storePopup.form.utils.error.isProductErrors()) {
      switch (formActionType) {
        case 'create':
          storeProduct.add.products(() => {
            storePopup.form.product.clearFormData();
            storePopup.select.points.clearArray();
            closeHandler();
          });
          break;
        case 'change':
          storeProduct.update.product(() => {
            storePopup.form.product.clearFormData();
            closeHandler();
          });
          break;
        default:
      }
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
    storeCategory.fetch.categories();
  }, []);

  return (
    <div className='popup popup--form popup--form-add-product'>
      <WindowHeaderForm
        title='Добавить партию товара'
        backEventHandler={closeHandler}
        saveEventHandler={saveHandler}
        closeEventHandler={closeHandler}
      />
      <div className='popup--form-add-product__content-block'>
        <FormLayout classes='main-info'>
          <AssembledBlockFieldInput
            typeForm='product'
            fieldName='title'
            titleText='Название'
          />
          <AssembledBlockFieldInput
            typeForm='product'
            fieldName='author'
            titleText='Автор'
          />
          <AssembledBlockFieldSelect
            typeForm='product'
            fieldName='categoryId'
            titleText='Категория'
            options={storeCategory.state.categories}
          />
        </FormLayout>

        <FormLayout classes='article-info'>
          <AssembledBlockFieldText
            typeForm='product'
            fieldName='article'
            titleText='Артикул'
          />
        </FormLayout>

        <FormLayout classes='second-info'>
          <AssembledBlockFieldInput
            typeForm='product'
            fieldName='yearOfPublication'
            titleText='Год издания'
          />
          <AssembledBlockFieldInput
            typeForm='product'
            fieldName='printingHouse'
            titleText='Типография'
          />
          <AssembledBlockFieldInput
            typeForm='product'
            fieldName='number'
            titleText='Количество'
          />
          <AssembledBlockFieldInput
            typeForm='product'
            fieldName='publishingHouse'
            titleText='Издательство'
          />
          <AssembledBlockFieldInput
            typeForm='product'
            fieldName='printDate'
            titleText='Дата печати'
          />
        </FormLayout>

        <FormLayout classes='points'>
          <FormBlock
            titleText=''
            classes='product-points'
          >
            <FormField
              customErrors={storePopup.select.points.arrayErrors}
              typeForm='custom'
              classes='product-points'
            >
              <FormFieldPoint clickHandler={openSelectPointsHandler} />
              <FormBlockTitle text='Точки' />
            </FormField>
          </FormBlock>
        </FormLayout>
        <div className='popup--form-add-product__photo-block'>
          <img
            src={imagePlaceholder}
            alt='product'
            className='popup--form-add-product__photo'
          />
          <p className='popup--form-add-product__photo-text'>
            Фотография товара
          </p>
        </div>
      </div>
    </div>
  );
});

export default PopupFormProduct;
