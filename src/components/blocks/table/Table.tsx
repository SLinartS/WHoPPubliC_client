import './style.scss';

import { observer } from 'mobx-react-lite';
import { FC } from 'react';

import { IProductForTable } from '../../../hooks/mapAndPoint/useGetProductListForTable/type';
import { IProduct } from '../../../store/products/type';
import { ITask } from '../../../store/tasks/type';
import TableColumn from './column/Column';
import TableRow from './row/Row';

interface ITableProps {
  data: Array<ITask> | Array<IProduct> | Array<IProductForTable>;
  tableHeader: Array<string>;
  additionalСlasses?: string;
}

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
          key={columns.article}
          columns={columns}
        />
      ))}
    </div>
  ),
);

export default Table;
