import { observer } from 'mobx-react-lite';
import { FC } from 'react';

import { ITableColumnShellProps } from './type';

const TableColumnShell: FC<ITableColumnShellProps> = ({
  children,
  classes,
  clickHandler,
}) => {
  return (
    <div
      onClick={clickHandler}
      className={`table__column-shell ${classes}`}
    >
      {children}
    </div>
  );
};

export default observer(TableColumnShell);
