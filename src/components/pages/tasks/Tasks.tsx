import './style.scss';

import { observer } from 'mobx-react-lite';
import { FC, useEffect } from 'react';

import { TTaskType } from '../../../store/type';
import { useRootStore } from '../../../utils/RootStoreProvider/useRootStore';
import Button from '../../blocks/button/Button';
import Loader from '../../blocks/loader/Loader';
import Table from '../../blocks/table/Table';

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

  return (
    <main className='tasks'>
      <div className='tasks__title'>
        <h3 className='tasks__title-text'>Приёмка</h3>
      </div>
      <div className='tasks__block'>
        <Button
          additionalСlasses='button--tasks'
          text='Добавить'
          clickHandler={() => showAddTaskWindowHandler('acceptance')}
        />
        {storeTask.status.get('fetchAcceptance') === 'done' ? (
          <Table
            data={storeTask.state.acceptanceList.data}
            keyWord='article'
            tableHeader={storeTask.state.acceptanceList.tableHeader}
            valuesType='acceptanceTasks'
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
          clickHandler={() => showAddTaskWindowHandler('shipment')}
        />

        {storeTask.status.get('fetchShipment') === 'done' ? (
          <Table
            data={storeTask.state.shipmentList.data}
            keyWord='article'
            tableHeader={storeTask.state.shipmentList.tableHeader}
            valuesType='shipmentTasks'
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
