import './style.scss';

import { observer } from 'mobx-react-lite';
import { FC, ReactNode, useEffect } from 'react';

import { TTaskStatus } from '../../../store/task/status/type';
import { TTypeTaskStates } from '../../../store/task/type';
import { TTaskType } from '../../../store/type';
import { useRootStore } from '../../../utils/RootStoreProvider/useRootStore';
import Button from '../../blocks/button/Button';
import Loader from '../../blocks/loader/Loader';
import Table from '../../blocks/table/Table';
import { TTableValuesType } from '../../blocks/table/type';

const Tasks: FC = observer(() => {
  const { storeTask, storePopup, storeForm } = useRootStore();

  function showAddTaskWindowHandler(taskType: TTaskType) {
    storeForm.state.currentTaskType = taskType;
    storePopup.showTaskForm();
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
    valuesType: TTableValuesType,
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
        <Button
          classes='button--tasks'
          text='Добавить'
          clickHandler={() => showAddTaskWindowHandler('acceptance')}
        />
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
        <Button
          classes='button--tasks'
          text='Добавить'
          clickHandler={() => showAddTaskWindowHandler('shipment')}
        />
        {displayTasksTable('fetchShipment', 'shipmentTasks', 'shipmentList')}
      </div>
    </main>
  );
});

export default Tasks;
