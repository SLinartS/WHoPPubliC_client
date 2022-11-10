import './style.scss';

import { observer } from 'mobx-react-lite';
import { FC, useEffect } from 'react';

import { TTaskType } from '../../../store/type';
import { useRootStore } from '../../../utils/RootStoreProvider/useRootStore';
import Button from '../../blocks/button/Button';
import Loader from '../../blocks/loader/Loader';
import Table from '../../blocks/table/Table';

const Tasks: FC = observer(() => {
  const { storeTasks, storePopup, storeFormState } = useRootStore();

  function showAddTaskWindowHandler(taskType: TTaskType) {
    storeFormState.currentTaskType = taskType;
    storePopup.showTaskForm();
  }

  useEffect(() => {
    if (storeTasks.statusFetchAcceptanceTasks === 'pending') {
      storeTasks.fetchAcceptanceTasks();
    }
    if (storeTasks.statusFetchShipmentTasks === 'pending') {
      storeTasks.fetchShipmentTasks();
    }
  }, [
    storeTasks.statusFetchAcceptanceTasks,
    storeTasks.statusFetchShipmentTasks,
  ]);

  return (
    <main className='tasks'>
      <div className='tasks__title'>
        <h3 className='tasks__title-text'>Приёмка</h3>
      </div>
      <div className='tasks__block'>
        <Button
          additionalСlasses='button--tasks'
          text='Добавить'
          clickEvent={() => showAddTaskWindowHandler('acceptance')}
        />
        {storeTasks.statusFetchAcceptanceTasks === 'done' ? (
          <Table
            data={storeTasks.tasksAcceptanceList.data}
            keyWord='article'
            tableHeader={storeTasks.tasksAcceptanceList.tableHeader}
            additionalСlasses='table--tasks'
          />
        ) : (
          <Loader />
        )}
      </div>
      <div className='tasks__title tasks__title--shipment'>
        <h3 className='tasks__title-text tasks__title-text'>Отгрузка</h3>
      </div>
      <div className='tasks__block'>
        <Button
          additionalСlasses='button--tasks'
          text='Добавить'
          clickEvent={() => showAddTaskWindowHandler('shipment')}
        />

        {storeTasks.statusFetchShipmentTasks === 'done' ? (
          <Table
            data={storeTasks.tasksShipmentList.data}
            keyWord='article'
            tableHeader={storeTasks.tasksShipmentList.tableHeader}
            additionalСlasses='table--tasks'
          />
        ) : (
          <Loader />
        )}
      </div>
    </main>
  );
});

export default Tasks;
