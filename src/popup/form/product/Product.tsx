import '../style.scss';
import '../../style.scss';

import imagePlaceholder from '@assets/images/placeholder.jpg';
import AssembledBlockFieldInput from '@components/form/assembled/BlockFieldInput';
import AssembledBlockFieldSelect from '@components/form/assembled/BlockFieldSelect';
import AssembledBlockFieldText from '@components/form/assembled/BlockFieldText';
import FormBlock from '@components/form/block/Block';
import FormBlockTitle from '@components/form/block/title/Title';
import FormField from '@components/form/field/Field';
import FormFieldPoint from '@components/form/field/point/Point';
import FormLayout from '@components/form/layout/Layout';
import WindowHeaderForm from '@components/windowHeader/form/Form';
import { useRootStore } from '@helpers/RootStoreProvider/useRootStore';
import { useFetchOneProductAndFillForm } from '@hooks/product/useFetchOneProductAndFillForm';
import { IOption } from '@store/category/type';
import { IProductFormDataFields } from '@store/popup/form/product/type';
import { observer } from 'mobx-react-lite';
import { FC, useEffect, useMemo, useRef, useState } from 'react';
import { useIsProductErrors } from 'src/popup/hooks/errors/product/useIsProductErrors';
import { useResetForm } from 'src/popup/hooks/resetForm/useResetForm';

const PopupFormProduct: FC = () => {
  const { storePopup, storeProduct, storeCategory, storeUtils } =
    useRootStore();
  const fetchOneProductAndFillForm = useFetchOneProductAndFillForm();
  const resetForm = useResetForm();
  const isProductErrors = useIsProductErrors();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedImageName, setSelectedImageName] =
    useState<string>('Выберите файл');

  function generateArticle() {
    storeUtils.generateArticle('product', () => {
      storePopup.form.product.setFormField('article', storeUtils.article);
    });
  }

  function changeSelectHandler(option: IOption) {
    storePopup.form.product.setFormField('categoryId', String(option.id));
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

  function changeFieldHandler(
    newValue: string,
    fieldName: keyof IProductFormDataFields,
  ) {
    storePopup.form.product.setFormField(fieldName, String(newValue));
  }

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

  const currentCategoryValue = useMemo(() => {
    const id = Number(storePopup.form.product.getFormField('categoryId'));
    const title = storeCategory.state.categories.find(
      (category) => category.id === id,
    )?.title;
    if (title) {
      return { id, title };
    }
    return { id, title: '' };
  }, [
    storeCategory.status.get('fetch'),
    storePopup.form.product.getFormField('categoryId'),
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

  useEffect(() => {
    storeCategory.action.fetch();
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
          <AssembledBlockFieldInput
            value={storePopup.form.product.getFormField('author')}
            errors={storePopup.form.product.getFormErrors('author')}
            changeHandler={changeFieldHandler}
            typeForm='product'
            fieldName='author'
            titleText='Автор'
            placeholder='Отсутствует'
          />
          <AssembledBlockFieldSelect
            options={storeCategory.state.categories}
            errors={storePopup.form.product.getFormErrors('categoryId')}
            changeHandler={changeSelectHandler}
            currentOption={currentCategoryValue}
            typeForm='product'
            fieldName='categoryId'
            titleText='Категория'
          />
        </FormLayout>

        <FormLayout classes='article-info-product'>
          <AssembledBlockFieldText
            typeForm='product'
            fieldName='article'
            value={storePopup.form.product.getFormField('article')}
            errors={storePopup.form.product.getFormErrors('article')}
            titleText='Артикул'
          />
        </FormLayout>

        <FormLayout classes='second-info'>
          <AssembledBlockFieldInput
            typeForm='product'
            fieldName='yearOfPublication'
            titleText='Год издания'
            value={storePopup.form.product.getFormField('yearOfPublication')}
            changeHandler={changeFieldHandler}
            errors={storePopup.form.product.getFormErrors('yearOfPublication')}
            placeholder='1998'
          />
          <AssembledBlockFieldInput
            typeForm='product'
            fieldName='printingHouse'
            titleText='Типография'
            value={storePopup.form.product.getFormField('printingHouse')}
            changeHandler={changeFieldHandler}
            errors={storePopup.form.product.getFormErrors('printingHouse')}
            placeholder='ОФСЕТ МОСКВА'
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
          <AssembledBlockFieldInput
            typeForm='product'
            fieldName='publishingHouse'
            titleText='Издательство'
            value={storePopup.form.product.getFormField('publishingHouse')}
            changeHandler={changeFieldHandler}
            errors={storePopup.form.product.getFormErrors('publishingHouse')}
            placeholder='АСТ'
          />
          <AssembledBlockFieldInput
            typeForm='product'
            fieldName='yearOfPrinting'
            titleText='Дата печати'
            value={storePopup.form.product.getFormField('yearOfPrinting')}
            changeHandler={changeFieldHandler}
            errors={storePopup.form.product.getFormErrors('yearOfPrinting')}
            placeholder='26.05.2022'
          />
        </FormLayout>

        <FormLayout classes='points-product'>
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
        <FormLayout classes='photo-product'>
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
      </div>
    </>
  );
};

export default observer(PopupFormProduct);
