import { observer } from 'mobx-react-lite';
import { FC } from 'react';

import { ITableColumnShellProps } from './type';

const TableColumnShell: FC<ITableColumnShellProps> = observer(
  ({ children, additionalClasses }) => {
    return (
      <div className={`table__column-shell ${additionalClasses}`}>
        {children}
      </div>
    );
  },
);

export default TableColumnShell;
