import AssembledBlockFieldInput from '@components/form/assembled/BlockFieldInput';
import FormLayout from '@components/form/layout/Layout';
import { useRootStore } from '@helpers/RootStoreProvider/useRootStore';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';

import { useChangeFieldHandler } from '../hooks/changeFieldHandler';
import { IProductVariantProps } from './type';

const PopupFormProductBook: FC<IProductVariantProps> = ({ variantClass }) => {
  const { storePopup } = useRootStore();
  const changeFieldHandler = useChangeFieldHandler();

  return (
    <>
      <FormLayout classes={`${variantClass}__main-info`}>
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
      </FormLayout>

      <FormLayout classes={`${variantClass}__second-info`}>
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
    </>
  );
};

export default observer(PopupFormProductBook);
