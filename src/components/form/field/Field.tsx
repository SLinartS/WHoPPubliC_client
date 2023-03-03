import './style.scss';

import errorIcon from '@assets/icons/error/error-fourth.svg';
import { observer } from 'mobx-react-lite';
import { FC, ReactNode } from 'react';

interface IFormFieldProps {
  children: ReactNode;
  errors: string[][];
  classes?: string;
}

const FormField: FC<IFormFieldProps> = ({ children, errors, classes }) => {
  function displayError() {
    let displayedErrors: string[] = [];
    for (let i = 0; i < errors.length; i += 1) {
      if (errors[i].length > 0) {
        displayedErrors.push(errors[i][0]);
      }
    }
    if (displayedErrors.length > 1) {
      displayedErrors = displayedErrors.map((error) => `${error}. `);
    }
    return displayedErrors;
  }

  return (
    <div className={`form-layout__field form-layout__field--${classes}`}>
      {displayError().length ? (
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
