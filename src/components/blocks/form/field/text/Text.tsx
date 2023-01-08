import { observer } from 'mobx-react-lite';
import { FC } from 'react';

import { IProductFormDataFields } from '../../../../../store/popup/form/product/type';
import { ITaskFormDataFields } from '../../../../../store/popup/form/task/type';
import { useRootStore } from '../../../../../utils/RootStoreProvider/useRootStore';

interface IFormFieldTextProps {
  fieldName: keyof ITaskFormDataFields | keyof IProductFormDataFields;
  typeForm: 'task' | 'product';
}

const FormFieldText: FC<IFormFieldTextProps> = observer(
  ({ typeForm, fieldName }) => {
    const { storePopup } = useRootStore();

    function getValue(): string {
      switch (typeForm) {
        case 'task':
          return storePopup.form.task.getFormField(
            fieldName as keyof ITaskFormDataFields,
          );
        case 'product':
          return storePopup.form.product.getFormField(
            fieldName as keyof IProductFormDataFields,
          );
        default:
          return 'Ошибка поиска значения';
      }
    }

    return <p className='form-layout__text'>{getValue()}</p>;
  },
);

export default FormFieldText;
