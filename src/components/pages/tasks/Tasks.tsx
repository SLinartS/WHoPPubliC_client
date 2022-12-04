import './style.scss';

import { observer } from 'mobx-react-lite';
import { FC, ReactNode, useEffect } from 'react';

import { ISelectedItems } from '../../../store/table/selectedItem/type';
import { TTaskStatus } from '../../../store/task/status/type';
import { TTypeTaskStates } from '../../../store/task/type';
import { TTaskType } from '../../../store/type';
import { useRootStore } from '../../../utils/RootStoreProvider/useRootStore';
import Button from '../../blocks/button/Button';
import Loader from '../../blocks/loader/Loader';
import Table from '../../blocks/table/Table';

const Tasks: FC = observer(() => {
  const { storeTask, storePopup, storeTable } = useRootStore();

  function showAddTaskWindowHandler(taskType: TTaskType) {
    storePopup.form.state.currentTaskType = taskType;
    storePopup.status.showTaskForm();
  }

  function deleteTask(
    taskType: keyof ISelectedItems,
    taskId: number,
    isDeleteProducts: boolean,
  ): void {
    storeTask.delete.task(taskId, isDeleteProducts, () => {
      storePopup.status.hideWindowConfirm();
      if (taskType === 'acceptanceTasks') {
        storeTask.status.set('fetchAcceptance', 'pending');
      }
      if (taskType === 'shipmentTasks') {
        storeTask.status.set('fetchShipment', 'pending');
      }
    });
  }

  function deleteTaskShell(taskType: keyof ISelectedItems): void {
    const taskId = storeTable.selectedItem.getItemId(taskType);

    if (taskId === 0) {
      storePopup.windows.information.setting = {
        text: 'Выберите строку, чтобы её удалить',
      };
      storePopup.status.showWindowInformation();
    } else {
      storePopup.windows.confirm.setting = {
        title: `Удалить задачу Id:${taskId}?`,
        firstButtonEvent: () => {
          storePopup.status.hideWindowConfirm(() => {
            storePopup.windows.confirm.setting = {
              title: `Удалить связанные с задачей товары?`,
              firstButtonEvent: () => {
                deleteTask(taskType, taskId, true);
                storePopup.status.hideWindowConfirm();
              },
              secondButtonEvent: () => {
                deleteTask(taskType, taskId, false);
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
  }

  function deleteHandler(itemType: keyof ISelectedItems) {
    switch (itemType) {
      case 'acceptanceTasks':
        deleteTaskShell('acceptanceTasks');
        break;
      case 'shipmentTasks':
        deleteTaskShell('shipmentTasks');
        break;
      default:
    }
  }

  useEffect(() => {
    if (storeTask.status.get('fetchAcceptance') === 'pending') {
      storeTask.fetch.acceptanceTasks();
    }
  }, [storeTask.status.get('fetchAcceptance')]);

  useEffect(() => {
    if (storeTask.status.get('fetchShipment') === 'pending') {
      storeTask.fetch.shipmentTasks();
    }
  }, [storeTask.status.get('fetchShipment')]);

  function displayTasksTable(
    fetchType: TTaskStatus,
    valuesType: keyof ISelectedItems,
    listType: TTypeTaskStates,
  ): ReactNode {
    if (storeTask.status.get(fetchType) === 'done') {
      if (storeTask.state[listType].data.length) {
        return (
          <Table
            data={storeTask.state[listType].data}
            keyWord='article'
            tableHeader={storeTask.state[listType].tableHeader}
            valuesType={valuesType}
            classes='table--tasks'
          />
        );
      }
      return (
        <p className='tasks__empty-text'>Отсутствуют добавленные задачи</p>
      );
    }
    return <Loader />;
  }

  return (
    <main className='tasks'>
      <div className='tasks__title'>
        <h3 className='tasks__title-text'>Приёмка</h3>
      </div>
      <div className='tasks__block'>
        <div className='tasks__section-button'>
          <Button
            classes='button--tasks'
            text='Добавить'
            clickHandler={() => showAddTaskWindowHandler('acceptance')}
          />
          <Button
            classes='button--tasks'
            text='Изменить'
            clickHandler={() => deleteHandler('acceptanceTasks')}
          />
          <Button
            classes='button--tasks'
            text='Удалить'
            clickHandler={() => deleteHandler('acceptanceTasks')}
          />
        </div>

        {displayTasksTable(
          'fetchAcceptance',
          'acceptanceTasks',
          'acceptanceList',
        )}
      </div>
      <div className='tasks__title tasks__title--shipment'>
        <h3 className='tasks__title-text tasks__title-text'>Отгрузка</h3>
      </div>
      <div className='tasks__block'>
        <div className='tasks__section-button'>
          <Button
            classes='button--tasks'
            text='Добавить'
            clickHandler={() => showAddTaskWindowHandler('shipment')}
          />
          <Button
            classes='button--tasks'
            text='Изменить'
            clickHandler={() => deleteHandler('shipmentTasks')}
          />
          <Button
            classes='button--tasks'
            text='Удалить'
            clickHandler={() => deleteHandler('shipmentTasks')}
          />
        </div>
        {displayTasksTable('fetchShipment', 'shipmentTasks', 'shipmentList')}
      </div>
    </main>
  );
});

export default Tasks;
