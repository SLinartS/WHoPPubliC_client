import { observer } from 'mobx-react-lite';
import React, { FC, ReactNode } from 'react';

import { useRootStore } from '../../../../utils/RootStoreProvider/useRootStore';

interface IFormFieldProps {
  children: ReactNode;
  errors: string[];
}

const FormField: FC<IFormFieldProps> = observer(({ children, errors }) => {
  const { storeFormState } = useRootStore();

  return (
    <div
      className='form-block__field'
      data-testid='form-field'
    >
      <p className='form-block__error'>
        {storeFormState.isDisplayDefaultErrors && errors[0]}
      </p>
      {children}
    </div>
  );
});

export default FormField;
