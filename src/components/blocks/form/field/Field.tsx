import { observer } from 'mobx-react-lite';
import { FC, ReactNode } from 'react';

import {
  emptyArrayErrorText,
  emptyFieldErrorText,
} from '../../../../utils/formValidator/config';
import { useRootStore } from '../../../../utils/RootStoreProvider/useRootStore';

interface IFormFieldProps {
  children: ReactNode;
  errors: string[];
}

const FormField: FC<IFormFieldProps> = observer(({ children, errors }) => {
  const { storePopup } = useRootStore();

  function displayError() {
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

  return (
    <div
      className='form-block__field'
      data-testid='form-field'
    >
      <p className='form-block__error'>{displayError()}</p>
      {children}
    </div>
  );
});

export default FormField;
