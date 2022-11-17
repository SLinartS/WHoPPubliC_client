import { ReactElement, ReactNode } from 'react';

import { TMouseButtonEventHandler } from '../../../../../types/form/type';

export interface ITableColumnShellProps {
  classes?: string;
  children: ReactNode | ReactElement;
}

export interface ITableColumnShellButtonProps extends ITableColumnShellProps {
  buttonText: string;
  buttonClickHandler: TMouseButtonEventHandler;
  buttonAdditionalСlasses: string;
}
