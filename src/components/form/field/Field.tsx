import './style.scss';

import errorIcon from '@assets/icons/error.svg';
import {
  emptyArrayErrorText,
  emptyFieldErrorText,
} from '@helpers/formValidator/config';
import { useRootStore } from '@helpers/RootStoreProvider/useRootStore';
import { IProductFormDataFields } from '@store/popup/form/product/type';
import { ITaskFormDataFields } from '@store/popup/form/task/type';
import { IUserFormDataFields } from '@store/popup/form/user/type';
import { observer } from 'mobx-react-lite';
import { FC, ReactNode } from 'react';

interface IFormFieldProps {
  children: ReactNode;
  typeForm: 'task' | 'product' | 'user' | 'custom';
  fieldName?:
    | keyof IProductFormDataFields
    | keyof ITaskFormDataFields
    | keyof IUserFormDataFields;
  customErrors?: string[];
  classes?: string;
}

const FormField: FC<IFormFieldProps> = ({
  children,
  typeForm,
  fieldName,
  customErrors,
  classes,
}) => {
  const { storePopup } = useRootStore();

  function displayError() {
    let errors;
    switch (typeForm) {
      case 'task':
        errors = storePopup.form.task.getFormErrors(
          fieldName as keyof ITaskFormDataFields,
        );
        break;
      case 'product':
        errors = storePopup.form.product.getFormErrors(
          fieldName as keyof IProductFormDataFields,
        );
        break;
      case 'user':
        errors = storePopup.form.user.getFormErrors(
          fieldName as keyof IUserFormDataFields,
        );
        break;
      case 'custom':
        errors = customErrors;
        break;
      default:
    }

    if (errors) {
      if (
        errors[0] === emptyFieldErrorText ||
        errors[0] === emptyArrayErrorText
      ) {
        if (storePopup.form.state.isDisplayDefaultErrors) {
          return errors[0];
        }
        return '';
      }
      return errors[0];
    }
    return '';
  }

  return (
    <div
      className={`form-layout__field form-layout__field--${classes}`}
      data-testid='form-field'
    >
      {displayError() ? (
        <>
          <img
            className='form-layout__error-image'
            src={errorIcon}
            alt='error'
          />
          <p className='form-layout__error'>{displayError()}</p>
        </>
      ) : (
        ''
      )}

      {children}
    </div>
  );
};

export default observer(FormField);
