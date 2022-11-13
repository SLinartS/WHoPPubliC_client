import './style.scss';

import { observer } from 'mobx-react-lite';
import { Key } from 'react';

import TableColumn from './column/Column';
import TableColumnShell from './column/shell/Shell';
import TableRow from './row/Row';

interface ITableProps<T> {
  data: T[];
  keyWord: keyof T;
  tableHeader: string[];
  additionalСlasses?: string;
}

export default observer(function Table<T extends object>({
  data,
  keyWord,
  tableHeader,
  additionalСlasses,
}: ITableProps<T>) {
  return (
    <div
      className={`table ${additionalСlasses}`}
      style={{ gridTemplateColumns: `repeat(${tableHeader.length}, auto)` }}
    >
      {tableHeader.map((text) => (
        <TableColumnShell
          key={text}
          additionalClasses='table__column-shell--header'
        >
          <TableColumn
            key={text}
            text={text}
          />
        </TableColumnShell>
      ))}
      {data.map((columns) => (
        <TableRow
          key={columns[keyWord] as Key}
          columns={columns}
        />
      ))}
    </div>
  );
});
