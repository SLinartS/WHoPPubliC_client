import { observer } from 'mobx-react-lite';
import { FC, ReactNode } from 'react';

import addIcon from '../../../assets/icons/add.svg';
import deleteIcon from '../../../assets/icons/delete.svg';
import editIcon from '../../../assets/icons/edit.svg';
import { ISelectedItems } from '../../../store/table/selectedItem/type';
import { TTaskStatus } from '../../../store/task/status/type';
import { TTypeTaskStates } from '../../../store/task/type';
import { TTaskType } from '../../../store/type';
import { useRootStore } from '../../../utils/RootStoreProvider/useRootStore';
import Loader from '../../blocks/loader/Loader';
import SearchField from '../../blocks/searchField/SearchField';
import Table from '../../blocks/table/Table';
import { TASK_TYPES } from './taskForSwitcher';

const Tasks: FC = observer(() => {
  const { storeTask, storePopup, storeTable, storeAction, storeState } =
    useRootStore();

  function getCurrentTypeOfTask(): TTaskType {
    return storeState.interface.getCurrentTypeOfTask();
  }

  function getCurrentSelectedItems(): keyof ISelectedItems {
    switch (getCurrentTypeOfTask()) {
      case 'intra':
        return 'intraTasks';

      case 'shipment':
        return 'shipmentTasks';

      default:
        return 'acceptanceTasks';
    }
  }

  function showAddTaskWindowHandler() {
    storePopup.form.state.formActionType = 'create';
    storePopup.status.showTaskForm();
  }

  function changeTask(): void {
    const taskType: keyof ISelectedItems = getCurrentSelectedItems();
    storePopup.form.state.formActionType = 'change';
    const taskId = storeTable.selectedItem.getItemId(taskType);

    if (taskId === 0) {
      storePopup.windows.information.setting = {
        text: 'Выберите строку, чтобы её изменить',
      };
      storePopup.status.showWindowInformation();
    } else {
      storeTask.fetch.oneTask(taskId, () => {
        storePopup.status.showTaskForm();
      });
    }
  }

  function deleteHandler() {
    const taskType: keyof ISelectedItems = getCurrentSelectedItems();
    storeAction.delete.deleteController(taskType);
  }

  function changeCurrentTypeOfTaskHandler(taskType: TTaskType) {
    storeState.interface.changeCurrentTypeOfTask(taskType);
  }

  function displayTasksTable(): ReactNode {
    let fetchType: TTaskStatus = 'fetchAcceptance';
    let valuesType: keyof ISelectedItems = 'acceptanceTasks';
    let listType: TTypeTaskStates = 'acceptanceList';
    switch (storeState.interface.getCurrentTypeOfTask()) {
      case 'intra':
        fetchType = 'fetchShipment';
        valuesType = 'shipmentTasks';
        listType = 'shipmentList';
        break;
      case 'shipment':
        fetchType = 'fetchShipment';
        valuesType = 'shipmentTasks';
        listType = 'shipmentList';
        break;
      default:
    }
    if (storeTask.status.get(fetchType) === 'done') {
      if (storeTask.state[listType].data.length) {
        return (
          <Table
            data={storeTask.state[listType].data}
            keyWord='article'
            valuesType={valuesType}
            classes='table--tasks'
          />
        );
      }
      return (
        <p className='tasks__empty-text'>Отсутствуют добавленные задачи</p>
      );
    }
    storeTask.fetch[valuesType]();
    return <Loader />;
  }

  return (
    <main className='tasks'>
      <div className='tasks__section-switcher'>
        {TASK_TYPES.map(({ type, text }) => (
          <button
            key={type + text}
            className={`tasks__switcher tasks__switcher--${type} ${
              getCurrentTypeOfTask() === type ? 'tasks__switcher--active' : ''
            }`}
            type='button'
            onClick={() => changeCurrentTypeOfTaskHandler(type)}
          >
            {text}
          </button>
        ))}
      </div>
      <div className='tasks__section-button'>
        <SearchField classes='search-field--tasks' />
        <img
          className='products__icon'
          src={addIcon}
          alt='add'
          onClick={showAddTaskWindowHandler}
        />
        <img
          className='products__icon'
          src={editIcon}
          alt='add'
          onClick={changeTask}
        />
        <img
          className='products__icon'
          src={deleteIcon}
          alt='add'
          onClick={deleteHandler}
        />
      </div>
      <div className='tasks__table'>{displayTasksTable()}</div>
    </main>
  );
});

export default Tasks;
