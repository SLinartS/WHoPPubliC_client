import { observer } from 'mobx-react-lite';
import { FC, ReactNode } from 'react';

import { TTaskType } from '../../../../store/type';
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
  const { storeTask, storeWindow, storePopup } = useRootStore();

  function deleteTask(
    taskType: TTaskType,
    taskId: number,
    isDeleteProducts: boolean,
  ): void {
    storeTask.delete.task(taskId, isDeleteProducts, () => {
      storePopup.hideWindowConfirm();
      if (taskType === 'acceptance') {
        storeTask.status.set('fetchAcceptance', 'pending');
      }
      if (taskType === 'shipment') {
        storeTask.status.set('fetchShipment', 'pending');
      }
    });
  }

  function deleteTaskShell(taskType: TTaskType): void {
    storeWindow.confirm.setting = {
      title: `Удалить задачу ${columns.id}?`,
      firstButtonEvent: () => {
        storePopup.hideWindowConfirm();
        setTimeout(() => {
          storeWindow.confirm.setting = {
            title: `Удалить связанные с задачей товары?`,
            firstButtonEvent: () => {
              deleteTask(taskType, columns.id, true);
              storePopup.hideWindowConfirm();
            },
            secondButtonEvent: () => {
              deleteTask(taskType, columns.id, false);
              storePopup.hideWindowConfirm();
            },
          };
          storePopup.showWindowConfirm();
        }, 200);
      },
      secondButtonEvent: () => {
        storePopup.hideWindowConfirm();
      },
    };
    storePopup.showWindowConfirm();
  }

  function deleteHandler() {
    switch (valuesType) {
      case 'products':
        break;
      case 'acceptanceTasks':
        deleteTaskShell('acceptance');
        break;
      case 'shipmentTasks':
        deleteTaskShell('shipment');
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
