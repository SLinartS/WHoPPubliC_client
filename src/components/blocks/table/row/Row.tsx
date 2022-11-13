import { observer } from 'mobx-react-lite';
import { ReactNode, useState } from 'react';

import TableColumn from '../column/Column';
import TableColumnShellChange from '../column/shell/change/Shell';
import TableColumnShellDelete from '../column/shell/delete/Shell';
import TableColumnShell from '../column/shell/Shell';

interface IRowProps<T> {
  columns: T;
}

export default observer(function TableRow<T extends object>({
  columns,
}: IRowProps<T>) {
  function displayTableColumnShell(
    key: string,
    value: any,
    index: number,
  ): ReactNode {
    if (index === Object.entries(columns).length - 1)
      return (
        <TableColumnShellDelete
          key={key + value}
          additionalClasses='table__column-shell--row'
        >
          <TableColumn
            key={key + value}
            text={value}
          />
        </TableColumnShellDelete>
      );
    if (index === Object.entries(columns).length - 2) {
      return (
        <TableColumnShellChange
          key={key + value}
          additionalClasses='table__column-shell--row'
        >
          <TableColumn
            key={key + value}
            text={value}
          />
        </TableColumnShellChange>
      );
    }
    return (
      <TableColumnShell
        key={key + value}
        additionalClasses='table__column-shell--row'
      >
        <TableColumn
          key={key + value}
          text={value}
        />
      </TableColumnShell>
    );
  }

  return (
    <>
      {Object.entries(columns).map(([key, value], index) =>
        displayTableColumnShell(key, value, index),
      )}
    </>
  );
});
