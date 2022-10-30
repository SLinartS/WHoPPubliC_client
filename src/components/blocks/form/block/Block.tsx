import { observer } from 'mobx-react-lite';
import { FC } from 'react';
import FormTitle from '../title/Title';
import { IFormBlockProps } from './type';

const FormBlock: FC<IFormBlockProps> = observer(
  ({ additionalTitleBlockClasses, titleText, children }) => (
    <div className='properties-block__block'>
      <FormTitle
        text={titleText}
        additionalСlasses={additionalTitleBlockClasses}
      />
      {children}
    </div>
  ),
);

export default FormBlock;
