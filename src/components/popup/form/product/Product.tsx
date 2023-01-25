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
import { useFetchOneProductAndFillForm } from '../../../pages/hooks/product/useFetchOneProductAndFillForm';

const PopupFormProduct: FC = observer(() => {
  const { storePopup, storeProduct, storeCategory } = useRootStore();
  const fetchOneProductAndFillFormHook = useFetchOneProductAndFillForm();

  function generateArticle() {
    const generateArticleForProduct = async () => {
      const generatedArticle =
        await storePopup.form.utils.utils.generateArticle('product');

      storePopup.form.product.setFormField('article', generatedArticle);
    };
    generateArticleForProduct();
  }

  function resetHandler() {
    const { formActionType } = storePopup.form.state;
    if (formActionType === 'create') {
      storePopup.form.product.clearFormData();
      generateArticle();
    }
    if (formActionType === 'change') {
      fetchOneProductAndFillFormHook(
        'formProduct',
        'Выберите строку, чтобы изменить задачу',
      );
    }
  }

  function closeHandler() {
    storePopup.status.hide('formProduct');
    storePopup.form.utils.utils.resetForm();
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
            storePopup.select.points.clear();
            closeHandler();
            storeProduct.status.set('fetch', 'pending');
          });
          break;
        case 'change':
          storeProduct.update.product(() => {
            storePopup.form.product.clearFormData();
            closeHandler();
            storeProduct.status.set('fetch', 'pending');
          });
          break;
        default:
      }
    } else {
      storePopup.form.state.isDisplayDefaultErrors = true;
    }
  }

  function openSelectPointsHandler() {
    storePopup.form.state.isInProductForm = true;
    storePopup.status.show('selectPoints');
  }

  useEffect(() => {
    storeCategory.fetch.categories();
  }, []);

  useEffect(() => {
    if (storePopup.form.state.formActionType === 'create') {
      generateArticle();
    }
  }, []);

  return (
    <div className='popup popup__popup-form popup-form popup-form--add-product'>
      <WindowHeaderForm
        title='Добавить партию товара'
        resetEventHandler={resetHandler}
        saveEventHandler={saveHandler}
        closeEventHandler={closeHandler}
      />
      <div className='popup-form__content-block popup-form__content-block--add-product'>
        <FormLayout classes='main-info'>
          <AssembledBlockFieldInput
            typeForm='product'
            fieldName='title'
            titleText='Название'
            readonlyInput={false}
            placeholder='Иван-царевич и серый волк'
          />
          <AssembledBlockFieldInput
            typeForm='product'
            fieldName='author'
            titleText='Автор'
            readonlyInput={false}
            placeholder='Отсутствует'
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
            readonlyInput={false}
            placeholder='1998'
          />
          <AssembledBlockFieldInput
            typeForm='product'
            fieldName='printingHouse'
            titleText='Типография'
            readonlyInput={false}
            placeholder='ОФСЕТ МОСКВА'
          />
          <AssembledBlockFieldInput
            typeForm='product'
            fieldName='number'
            titleText='Количество'
            readonlyInput={false}
            placeholder='300'
          />
          <AssembledBlockFieldInput
            typeForm='product'
            fieldName='publishingHouse'
            titleText='Издательство'
            readonlyInput={false}
            placeholder='АСТ'
          />
          <AssembledBlockFieldInput
            typeForm='product'
            fieldName='printDate'
            titleText='Дата печати'
            readonlyInput={false}
            placeholder='2020.05.26'
          />
        </FormLayout>

        <FormLayout classes='points'>
          <FormBlock
            titleText=''
            classes='product-points'
          >
            <FormField
              customErrors={storePopup.select.points.errors}
              typeForm='custom'
              classes='product-points'
            >
              <FormFieldPoint clickHandler={openSelectPointsHandler} />
              <FormBlockTitle text='Точки' />
            </FormField>
          </FormBlock>
        </FormLayout>
        <div className='popup-form__photo-block'>
          <img
            src={imagePlaceholder}
            alt='product'
            className='popup-form__photo'
          />
          <p className='popup-form__photo-text'>Фотография товара</p>
        </div>
      </div>
    </div>
  );
});

export default PopupFormProduct;
