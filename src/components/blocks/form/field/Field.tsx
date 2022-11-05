import { observer } from 'mobx-react-lite';
import React, { FC, ReactNode } from 'react';

interface IFormFieldProps {
  children: ReactNode;
  errors: string[];
}

const FormField: FC<IFormFieldProps> = observer(({ children, errors }) => {
  return (
    <div className='form-block__field'>
      <p className='form-block__error'>
        {errors[0] !== 'defaultError' ? errors[0] : ''}
      </p>
      {children}
    </div>
  );
});

export default FormField;
