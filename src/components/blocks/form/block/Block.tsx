import { observer } from 'mobx-react-lite';
import { FC, ReactNode } from 'react';

import FormTitle from '../title/Title';

interface IFormBlockProps {
  additionalTitleClasses?: string;
  titleText: string;
  children: ReactNode;
}

const FormBlock: FC<IFormBlockProps> = observer(
  ({ additionalTitleClasses, titleText, children }) => (
    <div className='form-block__block' data-testid='form-block-div'>
      <FormTitle
        text={titleText}
        additionalСlasses={additionalTitleClasses}
      />
      {children}
    </div>
  ),
);

export default FormBlock;
