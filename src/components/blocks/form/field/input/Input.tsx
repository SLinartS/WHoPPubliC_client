import { observer } from 'mobx-react-lite';
import { FC } from 'react';

import { IProductFormDataFields } from '../../../../../store/popup/form/product/type';
import { ITaskFormDataFields } from '../../../../../store/popup/form/task/type';
import { TChangeFieldEvent } from '../../../../../types/form/type';
import { useRootStore } from '../../../../../utils/RootStoreProvider/useRootStore';

interface IFormFieldInputProps {
  typeForm: 'task' | 'product';
  fieldName: keyof IProductFormDataFields | keyof ITaskFormDataFields;
  readonly: boolean;
  placeholder?: string;
  classes?: string;
}

const FormFieldInput: FC<IFormFieldInputProps> = observer(
  ({ typeForm, fieldName, readonly, placeholder, classes }) => {
    const { storePopup } = useRootStore();

    function changeFieldHandler(e: TChangeFieldEvent) {
      switch (typeForm) {
        case 'task':
          storePopup.form.task.setFormField(
            fieldName as keyof ITaskFormDataFields,
            e.target.value,
          );
          break;
        case 'product':
          storePopup.form.product.setFormField(
            fieldName as keyof IProductFormDataFields,
            e.target.value,
          );
          break;
        default:
      }
    }
    function getValue(): string {
      if (typeForm === 'task') {
        return storePopup.form.task.getFormField(
          fieldName as keyof ITaskFormDataFields,
        );
      }
      return storePopup.form.product.getFormField(
        fieldName as keyof IProductFormDataFields,
      );
    }

    return (
      <input
        readOnly={readonly}
        value={getValue()}
        className={`form-layout__input ${classes} ${
          getValue() ? 'form-layout__input--active' : ''
        }`}
        onChange={changeFieldHandler}
        placeholder={placeholder}
      />
    );
  },
);

export default FormFieldInput;
