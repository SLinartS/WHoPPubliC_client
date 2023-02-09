import { useRootStore } from '@helpers/RootStoreProvider/useRootStore';
import {
  TSelectedItems,
  TSelectedProducts,
  TSelectedUsers,
} from '@store/table/selectedItem/type';
import { TTaskType } from '@store/type';
import { observer } from 'mobx-react-lite';
import { FC, ReactNode } from 'react';

import TableColumn from '../column/Column';
import TableColumnShell from '../column/shell/Shell';
import { addBorderRadius } from '../helpers';
import { ITableObject } from '../type';

interface IRowProps {
  columns: ITableObject;
  valuesType: keyof TSelectedItems;
  selectingValues: TTaskType | TSelectedProducts | TSelectedUsers;
  displayedColumns?: string[];
}

const TableRow: FC<IRowProps> = ({
  columns,
  valuesType,
  selectingValues,
  displayedColumns,
}) => {
  const { storeTable } = useRootStore();

  function selectHandler() {
    storeTable.selectedItem.setItemId(
      valuesType,
      selectingValues,
      columns.id.value,
    );
  }

  function checkIsSelected(): string {
    if (
      storeTable.selectedItem.getItemId(valuesType, selectingValues) ===
      columns.id.value
    ) {
      return 'table__column-shell--selected';
    }
    return '';
  }

  function displayColumns(): ReactNode | null {
    const reactNodes: ReactNode[] = [];
    let index = -1;
    const { length } = displayedColumns!;
    Object.entries(columns).forEach(([key, value]) => {
      if (displayedColumns) {
        if (displayedColumns.includes(key)) {
          index += 1;
          reactNodes.push(
            <TableColumnShell
              key={key + value}
              classes={`${addBorderRadius(index, length)} ${checkIsSelected()}`}
              clickHandler={selectHandler}
            >
              <TableColumn
                key={key + value}
                text={value.value}
              />
            </TableColumnShell>,
          );
        }
      } else {
        reactNodes.push(
          <TableColumnShell
            key={key + value}
            classes={addBorderRadius(index, length)}
            clickHandler={selectHandler}
          >
            <TableColumn
              key={key + value}
              text={value.value}
            />
          </TableColumnShell>,
        );
      }
    });

    return reactNodes;
  }

  return <>{displayColumns()}</>;
};

export default observer(TableRow);
