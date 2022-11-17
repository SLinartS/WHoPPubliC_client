import './style.scss';

import { observer } from 'mobx-react-lite';
import { FC } from 'react';

import TableColumn from './column/Column';
import TableColumnShell from './column/shell/Shell';
import TableRow from './row/Row';
import { ITableObject, TTableValuesType } from './type';

interface ITableProps {
  data: ITableObject[];
  keyWord: keyof ITableObject;
  tableHeader: string[];
  valuesType: TTableValuesType;
  additionalСlasses?: string;
}

const Table: FC<ITableProps> = observer(
  ({ data, keyWord, tableHeader, valuesType, additionalСlasses }) => {
    return (
      <div
        className={`table ${additionalСlasses}`}
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
            key={columns[keyWord]}
            columns={columns}
          />
        ))}
      </div>
    );
  },
);

export default Table;
