import './style.scss';

import errorIcon from '@assets/icons/error.svg';
import {
  emptyArrayErrorText,
  emptyFieldErrorText,
} from '@helpers/formValidator/config';
import { useRootStore } from '@helpers/RootStoreProvider/useRootStore';
import { observer } from 'mobx-react-lite';
import { FC, ReactNode } from 'react';

interface IFormFieldProps {
  children: ReactNode;
  errors: string[];
  classes?: string;
}

const FormField: FC<IFormFieldProps> = ({ children, errors, classes }) => {
  const { storePopup } = useRootStore();

  function displayError() {
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
