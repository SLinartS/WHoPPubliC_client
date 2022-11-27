import { ReactElement, ReactNode } from 'react';

import { TMouseDivEventHandler } from '../../../../../types/form/type';

export interface ITableColumnShellProps {
  classes?: string;
  clickHandler?: TMouseDivEventHandler;
  children: ReactNode | ReactElement;
}
