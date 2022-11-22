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
  isShowIdColumn: boolean;
}

const TableRow: FC<IRowProps> = observer(
  ({ columns, valuesType, isShowIdColumn }) => {
    const { storeTask, storePopup } = useRootStore();

    function deleteTask(
      taskType: TTaskType,
      taskId: number,
      isDeleteProducts: boolean,
    ): void {
      storeTask.delete.task(taskId, isDeleteProducts, () => {
        storePopup.status.hideWindowConfirm();
        if (taskType === 'acceptance') {
          storeTask.status.set('fetchAcceptance', 'pending');
        }
        if (taskType === 'shipment') {
          storeTask.status.set('fetchShipment', 'pending');
        }
      });
    }

    function deleteTaskShell(taskType: TTaskType): void {
      storePopup.windows.confirm.setting = {
        title: `Удалить задачу ${columns.id}?`,
        firstButtonEvent: () => {
          storePopup.status.hideWindowConfirm(() => {
            storePopup.windows.confirm.setting = {
              title: `Удалить связанные с задачей товары?`,
              firstButtonEvent: () => {
                deleteTask(taskType, columns.id, true);
                storePopup.status.hideWindowConfirm();
              },
              secondButtonEvent: () => {
                deleteTask(taskType, columns.id, false);
                storePopup.status.hideWindowConfirm();
              },
            };
            storePopup.status.showWindowConfirm();
          });
        },
        secondButtonEvent: () => {
          storePopup.status.hideWindowConfirm();
        },
      };
      storePopup.status.showWindowConfirm();
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
    ): ReactNode | null {
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
      if (key !== 'id' || isShowIdColumn) {
        return (
          <TableColumnShell key={key + value}>{tableColumn}</TableColumnShell>
        );
      }
      return null;
    }

    return (
      <>
        {Object.entries(columns).map(([key, value], index) =>
          displayTableColumnShell(key, value, index),
        )}
      </>
    );
  },
);

export default TableRow;
