import { observer } from 'mobx-react-lite';
import { FC, ReactNode } from 'react';

import FormTitle from './title/Title';

interface IFormBlockProps {
  titleText: string;
  children: ReactNode;
  classes?: string;
}

const FormBlock: FC<IFormBlockProps> = observer(
  ({ classes, titleText, children }) => (
    <div
      className={`form-layout__block form-layout__block--${classes}`}
      data-testid='form-block-div'
    >
      <FormTitle
        text={titleText}
        classes={classes}
      />
      {children}
    </div>
  ),
);

export default FormBlock;
