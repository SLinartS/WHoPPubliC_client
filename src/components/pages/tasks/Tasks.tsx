import { observer } from 'mobx-react-lite';
import { FC, ReactNode } from 'react';

import addIcon from '../../../assets/icons/add.svg';
import deleteIcon from '../../../assets/icons/delete.svg';
import editIcon from '../../../assets/icons/edit.svg';
import eyeIcon from '../../../assets/icons/eye.svg';
import { ISelectedItems } from '../../../store/table/selectedItem/type';
import { TTaskStatus } from '../../../store/task/status/type';
import { TTypeTaskStates } from '../../../store/task/type';
import { TTaskType } from '../../../store/type';
import { useRootStore } from '../../../utils/RootStoreProvider/useRootStore';
import Loader from '../../blocks/loader/Loader';
import SearchField from '../../blocks/searchField/SearchField';
import Table from '../../blocks/table/Table';
import { TASK_TYPES_FOR_SWITCHER } from './taskForSwitcher';

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

  function showTaskWindowHandler() {
    const taskType: keyof ISelectedItems = getCurrentSelectedItems();
    const taskId = storeTable.selectedItem.getItemId(taskType);

    if (taskId === 0) {
      storePopup.windows.information.setting = {
        text: 'Выберите строку, чтобы её изменить',
      };
      storePopup.status.showWindowInformation();
    } else {
      // TODO убрать повтор кода (здесь и при открытии окна редактирования)
      storeTask.fetch.oneTask(taskId, () => {
        const { taskInfo } = storeTask.state.task;
        const { productIds } = storeTask.state.task;

        storePopup.form.task.setFormField('id', String(taskInfo.id.value));
        storePopup.form.task.setFormField('article', taskInfo.article.value);
        storePopup.form.task.setFormField('dateEnd', taskInfo.dateEnd.value);
        storePopup.form.task.setFormField(
          'dateStart',
          taskInfo.dateStart.value,
        );
        storePopup.select.products.setProductList(productIds);

        storePopup.status.showViewTask();
      });
    }
  }

  function showAddTaskWindowHandler() {
    storePopup.form.state.formActionType = 'create';
    storePopup.status.showFormTask();
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
        const { taskInfo } = storeTask.state.task;
        const { productIds } = storeTask.state.task;
        const { floorIds } = storeTask.state.task;

        storePopup.form.task.setFormField('id', String(taskInfo.id.value));
        storePopup.form.task.setFormField('article', taskInfo.article.value);
        storePopup.form.task.setFormField('dateEnd', taskInfo.dateEnd.value);
        storePopup.form.task.setFormField(
          'dateStart',
          taskInfo.dateStart.value,
        );
        storePopup.select.products.setProductList(productIds);
        storePopup.select.floors.setItems(floorIds);

        storePopup.status.showFormTask();
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
            displayedColumns={storeTable.utils.getColumnsWithMark('tasks')}
          />
        );
      }
      return (
        <p className='tasks__empty-text'>Отсутствуют добавленные задачи</p>
      );
    }
    storeTask.fetch[valuesType](() => {
      storeTable.utils.setDefaulMark(
        'tasks',
        storeTask.state[listType].data,
        [],
      );
    });
    return <Loader />;
  }

  return (
    <main className='tasks'>
      <div className='tasks__section-switcher'>
        {TASK_TYPES_FOR_SWITCHER.map(({ type, text }) => (
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
        {storeState.user.getUserData().role !== 'worker' ? (
          <>
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
          </>
        ) : (
          <img
            className='products__icon'
            src={eyeIcon}
            alt='show'
            onClick={showTaskWindowHandler}
          />
        )}
      </div>
      <div className='tasks__table'>{displayTasksTable()}</div>
    </main>
  );
});

export default Tasks;
