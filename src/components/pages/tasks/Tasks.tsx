import { FC, useEffect } from 'react';
import { observer } from 'mobx-react-lite';

import { useRootStore } from '../../../utils/RootStoreProvider/useRootStore';
import Table from '../../blocks/table/Table';
import Button from '../../blocks/button/Button';
import './style.scss';
import { TTaskType } from '../../../store/form/type';

const Tasks: FC = observer(() => {
  const { tasksStore, popupStore, addTaskFormStore } = useRootStore();

  function showAddTaskWindowHandler(taskType: TTaskType) {
    addTaskFormStore.currentTaskType = taskType;
    popupStore.showAddTaskWindow();
  }

  useEffect(() => {
    if (tasksStore.statusGetAcceptanceTasks === 'pending') {
      tasksStore.getAcceptanceTasks();
    }
    if (tasksStore.statusGetShipmentTasks === 'pending') {
      tasksStore.getShipmentTasks();
    }
  }, [
    tasksStore,
    tasksStore.statusGetAcceptanceTasks,
    tasksStore.statusGetShipmentTasks,
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
          onClick={() => showAddTaskWindowHandler('acceptance')}
        />
        {tasksStore.statusGetAcceptanceTasks === 'done' ? (
          <Table
            data={tasksStore.tasksAccepranceList.data}
            tableHeader={tasksStore.tasksAccepranceList.tableHeader}
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
          onClick={() => showAddTaskWindowHandler('shipment')}
        />

        {tasksStore.statusGetShipmentTasks === 'done' ? (
          <Table
            data={tasksStore.tasksShipmentList.data}
            tableHeader={tasksStore.tasksShipmentList.tableHeader}
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
