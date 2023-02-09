import { TChangeFieldEvent } from '@gtypes/form/type';
import { useRootStore } from '@helpers/RootStoreProvider/useRootStore';
import { IProductFormDataFields } from '@store/popup/form/product/type';
import { ITaskFormDataFields } from '@store/popup/form/task/type';
import { IUserFormDataFields } from '@store/popup/form/user/type';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';

interface IFormFieldInputProps {
  typeForm: 'task' | 'product' | 'user';
  fieldName:
    | keyof IProductFormDataFields
    | keyof ITaskFormDataFields
    | keyof IUserFormDataFields;
  readonly: boolean;
  placeholder?: string;
  classes?: string;
}

const FormFieldInput: FC<IFormFieldInputProps> = ({
  typeForm,
  fieldName,
  readonly,
  placeholder,
  classes,
}) => {
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
      case 'user':
        storePopup.form.user.setFormField(
          fieldName as keyof IUserFormDataFields,
          e.target.value,
        );
        break;
      default:
    }
  }
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
      case 'user':
        return storePopup.form.user.getFormField(
          fieldName as keyof IUserFormDataFields,
        );
      default:
        return '';
    }
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
};

export default observer(FormFieldInput);
