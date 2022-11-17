import { observer } from 'mobx-react-lite';
import { FC } from 'react';

import { ITableColumnShellProps } from './type';

const TableColumnShell: FC<ITableColumnShellProps> = observer(
  ({ children, classes }) => {
    return <div className={`table__column-shell ${classes}`}>{children}</div>;
  },
);

export default TableColumnShell;
