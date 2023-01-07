import { observer } from 'mobx-react-lite';
import { FC, ReactNode } from 'react';

import { ISelectedItems } from '../../../../store/table/selectedItem/type';
import { useRootStore } from '../../../../utils/RootStoreProvider/useRootStore';
import TableColumn from '../column/Column';
import TableColumnShell from '../column/shell/Shell';
import { addBorderRadius } from '../helpers';
import { ITableObject } from '../type';

interface IRowProps {
  columns: ITableObject;
  valuesType: keyof ISelectedItems;
  displayedColumns?: string[];
}

const TableRow: FC<IRowProps> = observer(
  ({ columns, valuesType, displayedColumns }) => {
    const { storeTable } = useRootStore();

    function selectHandler() {
      storeTable.selectedItem.setItemId(valuesType, columns.id.value);
    }

    function checkIsSelected(): string {
      if (storeTable.selectedItem.getItemId(valuesType) === columns.id.value) {
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
                classes={`${addBorderRadius(
                  index,
                  length,
                )} ${checkIsSelected()}`}
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
  },
);

export default TableRow;
