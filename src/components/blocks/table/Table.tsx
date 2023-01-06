import { observer } from 'mobx-react-lite';
import { FC, ReactNode } from 'react';

import { ISelectedItems } from '../../../store/table/selectedItem/type';
import { IField } from '../../../store/type';
import TableColumn from './column/Column';
import TableColumnShell from './column/shell/Shell';
import TableRow from './row/Row';
import { ITableObject } from './type';

interface ITableProps {
  data: ITableObject[];
  keyWord: keyof ITableObject;
  valuesType: keyof ISelectedItems;
  displayedColumns?: string[];
  classes?: string;
}

const Table: FC<ITableProps> = observer(
  ({ data, keyWord, valuesType, displayedColumns, classes }) => {
    function countColumnsNumber(): number {
      if (data[0]) {
        if (displayedColumns) {
          return Object.entries(data[0]).filter(([key]) =>
            displayedColumns?.includes(key),
          ).length;
        }
        return Object.entries(data[0]).length;
      }
      return 1;
    }

    function getOneHeader(element: IField<string | number>): ReactNode {
      return (
        <TableColumnShell
          key={element.value + element.alias}
          classes='table__column-shell--header'
        >
          <TableColumn
            key={element.value + element.alias}
            text={element.alias}
          />
        </TableColumnShell>
      );
    }

    function displayHeader(): ReactNode {
      if (data[0]) {
        return Object.entries(data[0]).map(([key, element]) => {
          if (displayedColumns) {
            if (displayedColumns.includes(key)) {
              return getOneHeader(element);
            }
            return null;
          }
          return getOneHeader(element);
        });
      }
      return <p>Данные отсутствуют</p>;
    }

    return (
      <div
        className={`table ${classes}`}
        style={{
          gridTemplateColumns: `repeat(${countColumnsNumber()}, auto)`,
        }}
      >
        {displayHeader()}
        {data.map((columns) => (
          <TableRow
            valuesType={valuesType}
            key={columns[keyWord].value + String(columns.id.value)}
            displayedColumns={displayedColumns}
            columns={columns}
          />
        ))}
      </div>
    );
  },
);

export default Table;
