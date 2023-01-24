import { observer } from 'mobx-react-lite';
import { FC, ReactNode } from 'react';

import addIcon from '../../../assets/icons/add.svg';
import deleteIcon from '../../../assets/icons/delete.svg';
import editIcon from '../../../assets/icons/edit.svg';
import eyeIcon from '../../../assets/icons/eye.svg';
import { TTaskType } from '../../../store/type';
import { useRootStore } from '../../../utils/RootStoreProvider/useRootStore';
import ButtonIcon from '../../blocks/buttonIcon/ButtonIcon';
import Loader from '../../blocks/loader/Loader';
import SearchField from '../../blocks/searchField/SearchField';
import Table from '../../blocks/table/Table';
import { useDeleteController } from '../hooks/delete/useDeleteController';
import { useFetchOneTaskAndFillForm } from '../hooks/task/useFetchOneTaskAndFillForm';
import { TASK_TYPES_FOR_SWITCHER } from './taskForSwitcher';

const Tasks: FC = observer(() => {
  const { storeTask, storePopup, storeTable, storeState } = useRootStore();
  const deleteControllerHook = useDeleteController();
  const fetchOneTaskAndFillFormHook = useFetchOneTaskAndFillForm();

  function getCurrentTypeOfTask(): TTaskType {
    return storeState.interface.getCurrentTypeOfTask();
  }

  function showViewTaskWindowHandler() {
    fetchOneTaskAndFillFormHook(
      getCurrentTypeOfTask(),
      'viewTask',
      'Выберите строку, чтобы просмотреть информацию о задаче',
      true,
    );
  }

  function showAddTaskWindowHandler() {
    storePopup.form.state.formActionType = 'create';
    storePopup.status.show('formTask');
  }

  function changeHandler(): void {
    storePopup.form.state.formActionType = 'change';
    fetchOneTaskAndFillFormHook(
      getCurrentTypeOfTask(),
      'formTask',
      'Выберите строку, чтобы изменить задачу',
    );
  }

  function deleteHandler() {
    deleteControllerHook(
      'tasks',
      getCurrentTypeOfTask(),
      'Выберите строку, чтобы удалить задачу',
    );
  }

  function changeCurrentTypeOfTaskHandler(taskType: TTaskType) {
    storeState.interface.changeCurrentTypeOfTask(taskType);
  }

  function displayTasksTable(): ReactNode {
    const typeOfTask = storeState.interface.getCurrentTypeOfTask();
    if (storeTask.status.getFetch(typeOfTask) === 'done') {
      if (storeTask.state.getTasks(typeOfTask).length) {
        return (
          <Table
            data={storeTask.state.getTasks(typeOfTask)}
            keyWord='article'
            valuesType='tasks'
            selectingValues={typeOfTask}
            classes='table--tasks'
            displayedColumns={storeTable.utils.getColumnsWithMark('tasks')}
          />
        );
      }
      return (
        <p className='tasks__empty-text'>Отсутствуют добавленные задачи</p>
      );
    }
    storeTask.fetch[typeOfTask](() => {
      storeTable.utils.setDefaulMark(
        'tasks',
        storeTask.state.getTasks(typeOfTask),
        [],
      );
    });
    return <Loader classes='loader--task-table' />;
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
        {storeState.user.userData.role !== 'worker' ? (
          <>
            <ButtonIcon
              src={addIcon}
              clickHandler={showAddTaskWindowHandler}
              alt='add'
            />
            <ButtonIcon
              src={editIcon}
              clickHandler={changeHandler}
              alt='change'
            />
            <ButtonIcon
              src={deleteIcon}
              clickHandler={deleteHandler}
              alt='delete'
            />
          </>
        ) : (
          <ButtonIcon
            src={eyeIcon}
            clickHandler={showViewTaskWindowHandler}
            alt='show'
          />
        )}
      </div>
      <div className='tasks__table'>{displayTasksTable()}</div>
    </main>
  );
});

export default Tasks;
