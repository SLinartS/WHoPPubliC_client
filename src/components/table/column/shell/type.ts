import { TMouseDivEventHandler } from '@gtypes/form/type';
import { ReactElement, ReactNode } from 'react';

export interface ITableColumnShellProps {
  classes?: string;
  clickHandler?: TMouseDivEventHandler;
  children: ReactNode | ReactElement;
}
