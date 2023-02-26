import './style.scss';

import {
  TSelectedItems,
  TSelectedProducts,
  TSelectedUsers,
} from '@store/table/selectedItem/type';
import { IField, TTaskType } from '@store/type';
import { observer } from 'mobx-react-lite';
import { FC, ReactNode } from 'react';

import TableColumn from './column/Column';
import TableColumnShell from './column/shell/Shell';
import { addBorderRadius } from './helpers';
import TableRow from './row/Row';
import { ITableObject } from './type';

interface ITableProps {
  data: ITableObject[];
  valuesType: keyof TSelectedItems;
  selectingValues: TTaskType | TSelectedProducts | TSelectedUsers;
  displayedColumns: string[];
  classes?: string;
}

const Table: FC<ITableProps> = ({
  data,
  valuesType,
  selectingValues,
  displayedColumns,
  classes,
}) => {
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

  function getOneHeader(
    element: IField<string | number>,
    index: number,
    length: number,
  ): ReactNode {
    return (
      <TableColumnShell
        key={element.value + element.alias}
        classes={`table__column-shell--header ${addBorderRadius(
          index,
          length,
        )}`}
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
      let index = -1;
      return Object.entries(data[0]).map(([key, element]) => {
        if (displayedColumns.includes(key)) {
          index += 1;
          return getOneHeader(element, index, displayedColumns!.length);
        }
        return null;
      });
    }
    return <p>Данные отсутствуют</p>;
  }

  return (
    <div className={`table-wrapper ${classes}`}>
      <div
        className='table'
        style={{
          gridTemplateColumns: `repeat(${countColumnsNumber()}, auto)`,
        }}
      >
        {displayHeader()}
        {data.map((columns) => (
          <TableRow
            valuesType={valuesType}
            selectingValues={selectingValues}
            key={selectingValues + String(columns.id.value)}
            displayedColumns={displayedColumns}
            columns={columns}
          />
        ))}
      </div>
    </div>
  );
};

export default observer(Table);
