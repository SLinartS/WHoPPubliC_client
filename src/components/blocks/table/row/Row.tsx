import { observer } from 'mobx-react-lite';
import { FC, ReactNode } from 'react';

import { useRootStore } from '../../../../utils/RootStoreProvider/useRootStore';
import TableColumn from '../column/Column';
import TableColumnShellButton from '../column/shell/button/Shell';
import TableColumnShell from '../column/shell/Shell';
import { ITableObject, TTableValuesType } from '../type';

interface IRowProps {
  columns: ITableObject;
  valuesType: TTableValuesType;
}

const TableRow: FC<IRowProps> = observer(({ columns, valuesType }) => {
  const { storeTask } = useRootStore();

  function deleteHandler() {
    switch (valuesType) {
      case 'products':
        break;
      case 'acceptanceTasks':
        storeTask.delete.task(columns.id, () => {
          storeTask.fetch.acceptanceTasks();
        });
        break;
      case 'shipmentTasks':
        storeTask.delete.task(columns.id, () => {
          storeTask.fetch.shipmentTasks();
        });
        break;
      default:
    }
  }

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
    </>
  );
});

export default TableRow;
