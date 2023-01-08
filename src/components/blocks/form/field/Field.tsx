import { observer } from 'mobx-react-lite';
import { FC, ReactNode } from 'react';

import { IProductFormDataFields } from '../../../../store/popup/form/product/type';
import { ITaskFormDataFields } from '../../../../store/popup/form/task/type';
import {
  emptyArrayErrorText,
  emptyFieldErrorText,
} from '../../../../utils/formValidator/config';
import { useRootStore } from '../../../../utils/RootStoreProvider/useRootStore';

interface IFormFieldProps {
  children: ReactNode;
  typeForm: 'task' | 'product' | 'custom';
  fieldName?: keyof IProductFormDataFields | keyof ITaskFormDataFields;
  customErrors?: string[];
  classes?: string;
}

const FormField: FC<IFormFieldProps> = observer(
  ({ children, typeForm, fieldName, customErrors, classes }) => {
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
        <p className='form-layout__error'>{displayError()}</p>
        {children}
      </div>
    );
  },
);

export default FormField;
