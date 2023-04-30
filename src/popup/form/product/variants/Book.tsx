import AssembledBlockFieldInput from '@components/form/assembled/BlockFieldInput';
import FormLayout from '@components/form/layout/Layout';
import { useRootStore } from '@helpers/RootStoreProvider/useRootStore';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';

import { useChangeFieldHandler } from '../hooks/changeFieldHandler';

const PopupFormProductBook: FC = () => {
  const { storePopup } = useRootStore();
  const changeFieldHandler = useChangeFieldHandler();

  return (
    <FormLayout classes='book-info'>
      <AssembledBlockFieldInput
        value={storePopup.form.product.getFormField('author')}
        errors={storePopup.form.product.getFormErrors('author')}
        changeHandler={changeFieldHandler}
        typeForm='product'
        fieldName='author'
        titleText='Автор'
        placeholder='Отсутствует'
      />
      <AssembledBlockFieldInput
        typeForm='product'
        fieldName='yearOfPrinting'
        titleText='Год печати'
        value={storePopup.form.product.getFormField('yearOfPrinting')}
        changeHandler={changeFieldHandler}
        errors={storePopup.form.product.getFormErrors('yearOfPrinting')}
        placeholder='2012'
      />
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
    </FormLayout>
  );
};

export default observer(PopupFormProductBook);
