import { observer } from 'mobx-react-lite';
import { FC, ReactNode } from 'react';

import FormTitle from '../title/Title';

interface IFormBlockProps {
  additionalTitleBlockClasses?: string;
  titleText: string;
  children: ReactNode;
}

const FormBlock: FC<IFormBlockProps> = observer(
  ({ additionalTitleBlockClasses, titleText, children }) => (
    <div className='form-block__block'>
      <FormTitle
        text={titleText}
        additionalСlasses={additionalTitleBlockClasses}
      />
      {children}
    </div>
  ),
);

export default FormBlock;
