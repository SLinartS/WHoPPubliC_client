import '../style.scss';
import '../../style.scss';

import imagePlaceholder from '@assets/images/placeholder.jpg';
import AssembledBlockFieldInput from '@components/form/assembled/BlockFieldInput';
import AssembledBlockFieldSelect from '@components/form/assembled/BlockFieldSelect';
import AssembledBlockFieldText from '@components/form/assembled/BlockFieldText';
import AssembledBlockFieldTextarea from '@components/form/assembled/BlockFieldTextarea';
import FormBlock from '@components/form/block/Block';
import FormBlockTitle from '@components/form/block/title/Title';
import FormField from '@components/form/field/Field';
import FormFieldPoint from '@components/form/field/point/Point';
import FormLayout from '@components/form/layout/Layout';
import WindowHeaderForm from '@components/windowHeader/form/Form';
import { useRootStore } from '@helpers/RootStoreProvider/useRootStore';
import { useFetchOneProductAndFillForm } from '@hooks/product/useFetchOneProductAndFillForm';
import { IOption } from '@store/category/type';
import { TProductTypes } from '@store/productType/type';
import { observer } from 'mobx-react-lite';
import { FC, ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import { useIsProductErrors } from 'src/popup/hooks/errors/product/useIsProductErrors';
import { useResetForm } from 'src/popup/hooks/resetForm/useResetForm';

import { useChangeFieldHandler } from './hooks/changeFieldHandler';
import { useChangeSelectHandler } from './hooks/changeSelectHandler';
import PopupFormProductBook from './variants/Book';
import PopupFormProductMagazine from './variants/Magazine';

const PopupFormProduct: FC = () => {
  const {
    storePopup,
    storeProductType,
    storeProduct,
    storeCategory,
    storeUtils,
  } = useRootStore();
  const fetchOneProductAndFillForm = useFetchOneProductAndFillForm();
  const resetForm = useResetForm();
  const isProductErrors = useIsProductErrors();
  const changeFieldHandler = useChangeFieldHandler();
  const changeSelectHandler = useChangeSelectHandler();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedImageName, setSelectedImageName] =
    useState<string>('Выберите файл');

  function generateArticle() {
    storeUtils.generateArticle('product', () => {
      storePopup.form.product.setFormField('article', storeUtils.article);
    });
  }

  function changeCategoryHandler(option: IOption) {
    changeSelectHandler('categoryId', option);
  }

  function changeProductTypeHandler(option: IOption) {
    changeSelectHandler('typeId', option);
  }

  const windowTitle = useMemo(() => {
    const action =
      storePopup.form.state.formActionType === 'create'
        ? 'Добавить'
        : 'Изменить';

    return `${action} партию товара`;
  }, []);

  const imageUrl = useMemo(() => {
    const imagePath = storeProduct.state.product.productInfo.imageUrl.value;
    if (imagePath) {
      return `${process.env.REACT_APP_STATIC_FILES_URL}public${imagePath}`;
    }
    return imagePlaceholder;
  }, []);

  function changeFileHandler() {
    const files = fileInputRef.current?.files;
    if (files) {
      storePopup.form.product.setFileValue(files[0]);
      if (files[0]) {
        setSelectedImageName(
          `${files[0].name.substring(0, 12)}${
            files[0].name.length > 12 ? '...' : ''
          }`,
        );
      } else {
        setSelectedImageName('Выберите файл');
      }
    }
  }

  const currentCategoryValue = useMemo((): IOption => {
    const id = Number(storePopup.form.product.getFormField('categoryId'));
    const category = storeCategory.state.categories.find(
      (oneCategory) => oneCategory.id === id,
    );
    if (category?.title) {
      return { id, title: category.title, alias: category.alias };
    }
    return { id, title: '', alias: '' };
  }, [
    storeCategory.status.get('fetch'),
    storePopup.form.product.getFormField('categoryId'),
  ]);

  const currentProductTypeValue = useMemo((): IOption => {
    const id = Number(storePopup.form.product.getFormField('typeId'));
    const productType = storeProductType.state.productTypes.find(
      (type) => type.id === id,
    );
    if (productType?.title) {
      storePopup.form.state.productVariantWindow =
        productType.title as TProductTypes;
      return { id, title: productType.title, alias: productType.alias };
    }
    return { id, title: '', alias: '' };
  }, [
    storeProductType.status.get('fetch'),
    storePopup.form.product.getFormField('typeId'),
  ]);

  function resetHandler() {
    const { formActionType } = storePopup.form.state;
    if (formActionType === 'create') {
      storePopup.form.product.clearFormData();
      generateArticle();
    }
    if (formActionType === 'update') {
      fetchOneProductAndFillForm(
        'formProduct',
        'Выберите строку, чтобы изменить задачу',
      );
    }
  }

  function closeHandler() {
    storePopup.status.hide('formProduct');
    resetForm();
  }

  function saveHandler() {
    const { formActionType } = storePopup.form.state;

    if (formActionType === 'create') {
      storePopup.form.product.setFormField('id', '0');
    }
    if (!isProductErrors()) {
      switch (formActionType) {
        case 'create':
          storeProduct.action.store(() => {
            storeProduct.action.addFile(() => {
              storePopup.form.product.clearFormData();
              storePopup.select.points.clear();
              closeHandler();
              storeProduct.status.set('fetch', 'pending');
            });
          });
          break;
        case 'update':
          storeProduct.action.update(() => {
            if (fileInputRef.current?.files && fileInputRef.current.files[0]) {
              storeProduct.action.addFile(() => {
                storePopup.form.product.clearFormData();
                closeHandler();
                storeProduct.status.set('fetch', 'pending');
              });
            } else {
              storePopup.form.product.clearFormData();
              closeHandler();
              storeProduct.status.set('fetch', 'pending');
            }
          });
          break;
        default:
      }
    }
  }

  function openSelectPointsHandler() {
    storePopup.form.state.isInProductForm = true;
    storePopup.status.show('selectPoints');
  }

  function displayProductVariantWindow(): ReactNode {
    switch (storePopup.form.state.productVariantWindow) {
      case 'book':
        return <PopupFormProductBook />;
      case 'magazine':
        return <PopupFormProductMagazine />;
      case 'other':
        return <p />;
      default:
        return <PopupFormProductBook />;
    }
  }

  useEffect(() => {
    storeCategory.action.fetch();
    storeProductType.action.fetch();
  }, []);

  useEffect(() => {
    if (storePopup.form.state.formActionType === 'create') {
      generateArticle();
    }
  }, []);

  return (
    <>
      <WindowHeaderForm
        title={windowTitle}
        resetEventHandler={resetHandler}
        saveEventHandler={saveHandler}
        closeEventHandler={closeHandler}
      />

      <div className='popup-form__content-block popup-form__content-block--add-product'>
        <FormLayout classes='general'>
          <AssembledBlockFieldText
            typeForm='product'
            fieldName='article'
            value={storePopup.form.product.getFormField('article')}
            errors={storePopup.form.product.getFormErrors('article')}
            titleText='Артикул'
          />
          <FormBlock
            titleText=''
            classes='product-points'
          >
            <FormField
              errors={[storePopup.select.points.errors]}
              classes='product-points'
            >
              <FormFieldPoint clickHandler={openSelectPointsHandler} />
              <FormBlockTitle text='Точки' />
            </FormField>
          </FormBlock>
        </FormLayout>

        <FormLayout classes='type-and-category'>
          <AssembledBlockFieldSelect
            options={storeProductType.state.productTypes}
            errors={storePopup.form.product.getFormErrors('typeId')}
            changeHandler={changeProductTypeHandler}
            currentOption={currentProductTypeValue}
            typeForm='product'
            fieldName='typeId'
            titleText='Тип'
          />
          <AssembledBlockFieldSelect
            options={storeCategory.state.categories}
            errors={storePopup.form.product.getFormErrors('categoryId')}
            changeHandler={changeCategoryHandler}
            currentOption={currentCategoryValue}
            typeForm='product'
            fieldName='categoryId'
            titleText='Категория'
          />
          <AssembledBlockFieldInput
            typeForm='product'
            fieldName='number'
            titleText='Количество'
            value={storePopup.form.product.getFormField('number')}
            changeHandler={changeFieldHandler}
            errors={storePopup.form.product.getFormErrors('number')}
            placeholder='300'
          />
        </FormLayout>
        <FormLayout classes='main-info'>
          <AssembledBlockFieldInput
            value={storePopup.form.product.getFormField('title')}
            errors={storePopup.form.product.getFormErrors('title')}
            changeHandler={changeFieldHandler}
            typeForm='product'
            fieldName='title'
            titleText='Название'
            placeholder='Иван-царевич и серый волк'
          />
          <AssembledBlockFieldTextarea
            value={storePopup.form.product.getFormField('note')}
            errors={storePopup.form.product.getFormErrors('note')}
            changeHandler={changeFieldHandler}
            typeForm='product'
            fieldName='note'
            titleText='Примечание'
            placeholder='Дополнительная информация...'
          />
          <FormBlock
            titleText=''
            classes='product-photo'
          >
            <FormField
              errors={[storePopup.form.product.getFileErrors()]}
              classes='product-photo'
            >
              <img
                src={imageUrl}
                alt='product'
                className='popup-form__photo'
              />
              <label
                htmlFor='photo'
                className='popup-form__photo-label'
              >
                {selectedImageName}
              </label>
              <input
                id='photo'
                ref={fileInputRef}
                type='file'
                accept='.png, .jpg, .jpeg'
                name='image'
                onChange={changeFileHandler}
                className='popup-form__photo-input'
              />
            </FormField>
          </FormBlock>
        </FormLayout>

        {displayProductVariantWindow()}
      </div>
    </>
  );
};

export default observer(PopupFormProduct);
