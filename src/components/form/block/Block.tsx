import './style.scss';

import { observer } from 'mobx-react-lite';
import { FC, ReactNode } from 'react';

import FormTitle from './title/Title';

interface IFormBlockProps {
  titleText?: string;
  children: ReactNode;
  classes?: string;
}

const FormBlock: FC<IFormBlockProps> = ({ classes, titleText, children }) => (
  <div
    className={`form-layout__block form-layout__block--${classes}`}
    data-testid='form-block-div'
  >
    {titleText && (
      <FormTitle
        text={titleText}
        classes={classes}
      />
    )}
    {children}
  </div>
);

export default observer(FormBlock);
