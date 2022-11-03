import './style.scss';

import { observer } from 'mobx-react-lite';
import { Key } from 'react';

import TableColumn from './column/Column';
import TableRow from './row/Row';

interface ITableProps<T> {
  data: T[];
  keyWord: keyof T;
  tableHeader: Array<string>;
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
        <TableColumn
          key={text}
          text={text}
          additionalСlasses='table__block--header'
        />
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
