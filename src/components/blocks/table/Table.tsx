import { observer } from 'mobx-react-lite';
import { FC } from 'react';
import TableColumn from './TableColumn';

import TableRow from './TableRow';
import { ITableProps } from './type';
import './style.scss';

const Table: FC<ITableProps> = observer(
  ({ data, tableHeader, additionalСlasses }) => (
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
          key={columns.id}
          columns={columns}
        />
      ))}
    </div>
  ),
);

export default Table;
