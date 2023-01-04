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
  valuesType: keyof ISelectedItems;
  classes?: string;
}

const Table: FC<ITableProps> = observer(
  ({ data, keyWord, valuesType, classes }) => {
    return (
      <div
        className={`table ${classes}`}
        style={{
          gridTemplateColumns: `repeat(${Object.values(data[0]).length}, auto)`,
        }}
      >
        {Object.values(data[0]).map((element) => (
          <TableColumnShell
            key={element.value + String(Math.random())}
            classes='table__column-shell--header'
          >
            <TableColumn
              key={element.value + String(Math.random())}
              text={element.alias}
            />
          </TableColumnShell>
        ))}
        {data.map((columns) => (
          <TableRow
            valuesType={valuesType}
            key={columns[keyWord].value + String(columns.id.value)}
            columns={columns}
          />
        ))}
      </div>
    );
  },
);

export default Table;
