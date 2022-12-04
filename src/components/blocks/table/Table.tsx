import { observer } from 'mobx-react-lite';
import { FC } from 'react';

import { ISelectedItems } from '../../../store/table/selectedItem/type';
import TableColumn from './column/Column';
import TableColumnShell from './column/shell/Shell';
import TableRow from './row/Row';
import { ITableObject } from './type';

interface ITableProps {
  data: ITableObject[];
  keyWord: keyof ITableObject;
  tableHeader: string[];
  valuesType: keyof ISelectedItems;
  classes?: string;
}

const Table: FC<ITableProps> = observer(
  ({ data, keyWord, tableHeader, valuesType, classes }) => {
    return (
      <div
        className={`table ${classes}`}
        style={{ gridTemplateColumns: `repeat(${tableHeader.length}, auto)` }}
      >
        {tableHeader.map((text) => (
          <TableColumnShell
            key={text}
            classes='table__column-shell--header'
          >
            <TableColumn
              key={text}
              text={text}
            />
          </TableColumnShell>
        ))}
        {data.map((columns) => (
          <TableRow
            valuesType={valuesType}
            key={columns[keyWord] + String(columns.id)}
            columns={columns}
          />
        ))}
      </div>
    );
  },
);

export default Table;
