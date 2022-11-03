import './style.scss';

import { observer } from 'mobx-react-lite';
import { FC, useEffect } from 'react';

import { TTaskType } from '../../../store/type';
import { useRootStore } from '../../../utils/RootStoreProvider/useRootStore';
import Button from '../../blocks/button/Button';
import Table from '../../blocks/table/Table';

const Tasks: FC = observer(() => {
  const { storeTasks, storePopup, storeFormTask, storeProduct } =
    useRootStore();

  function showAddTaskWindowHandler(taskType: TTaskType) {
    storeFormTask.currentTaskType = taskType;
    storeProduct.statusAddProducts = 'pending';
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
    storeTasks,
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
            tableHeader={storeTasks.tasksAcceptanceList.tableHeader}
            additionalСlasses='table--tasks'
          />
        ) : (
          ''
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
            tableHeader={storeTasks.tasksShipmentList.tableHeader}
            additionalСlasses='table--tasks'
          />
        ) : (
          ''
        )}
      </div>
    </main>
  );
});

export default Tasks;
