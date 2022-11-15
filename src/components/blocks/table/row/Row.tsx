import { observer } from 'mobx-react-lite';
import { ReactNode } from 'react';

import TableColumn from '../column/Column';
import TableColumnShellButton from '../column/shell/button/Shell';
import TableColumnShell from '../column/shell/Shell';

interface IRowProps<T> {
  columns: T;
}

export default observer(function TableRow<T extends object>({
  columns,
}: IRowProps<T>) {
  function deleteHandler() {}

  function displayTableColumnShell(
    key: string,
    value: any,
    index: number,
  ): ReactNode {
    const tableColumn: ReactNode = (
      <TableColumn
        key={key + value}
        text={value}
      />
    );
    const columnsLength: number = Object.entries(columns).length;
    if (index === columnsLength - 1) {
      return (
        <TableColumnShellButton
          key={key + value}
          buttonText='Удалить'
          buttonAdditionalСlasses='button__delete'
          buttonClickHandler={deleteHandler}
        >
          {tableColumn}
        </TableColumnShellButton>
      );
    }
    if (index === columnsLength - 2) {
      return (
        <TableColumnShellButton
          key={key + value}
          buttonText='Изменить'
          buttonAdditionalСlasses='button__delete'
          buttonClickHandler={deleteHandler}
        >
          {tableColumn}
        </TableColumnShellButton>
      );
    }
    return <TableColumnShell key={key + value}>{tableColumn}</TableColumnShell>;
  }

  return (
    <>
      {Object.entries(columns).map(([key, value], index) =>
        displayTableColumnShell(key, value, index),
      )}
      {/* <div className='table__hover-helper' /> */}
    </>
  );
});
