import { observer } from 'mobx-react-lite';
import { FC, ReactNode } from 'react';

import { ISelectedItems } from '../../../../store/table/selectedItem/type';
import { IField } from '../../../../store/type';
import { useRootStore } from '../../../../utils/RootStoreProvider/useRootStore';
import TableColumn from '../column/Column';
import TableColumnShell from '../column/shell/Shell';
import { ITableObject } from '../type';

interface IRowProps {
  columns: ITableObject;
  valuesType: keyof ISelectedItems;
}

const TableRow: FC<IRowProps> = observer(({ columns, valuesType }) => {
  const { storeTable } = useRootStore();

  function selectHandler() {
    storeTable.selectedItem.setItemId(valuesType, columns.id.value);
  }

  function checkIsSelected() {
    if (storeTable.selectedItem.getItemId(valuesType) === columns.id.value) {
      return 'table__column-shell--selected';
    }
    return '';
  }

  function displayTableColumnShell(
    key: string,
    value: IField<string | number>,
  ): ReactNode | null {
    return (
      <TableColumnShell
        key={key + value}
        classes={checkIsSelected()}
        clickHandler={selectHandler}
      >
        <TableColumn
          key={key + value}
          text={value.value}
        />
      </TableColumnShell>
    );

    return null;
  }

  return (
    <>
      {Object.entries(columns).map(([key, value]) =>
        displayTableColumnShell(key, value),
      )}
    </>
  );
});

export default TableRow;
