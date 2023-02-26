import './style.scss';

import addIcon from '@assets/icons/add.svg';
import deleteIcon from '@assets/icons/delete.svg';
import editIcon from '@assets/icons/edit.svg';
import eyeIcon from '@assets/icons/eye.svg';
import ButtonIcon from '@components/buttonIcon/ButtonIcon';
import Loader from '@components/loader/Loader';
import SearchField from '@components/searchField/SearchField';
import Table from '@components/table/Table';
import { useRootStore } from '@helpers/RootStoreProvider/useRootStore';
import { useFetchOneTaskAndFillForm } from '@hooks/task/useFetchOneTaskAndFillForm';
import { TTaskType } from '@store/type';
import { observer } from 'mobx-react-lite';
import { FC, ReactNode } from 'react';

import { useDeleteController } from '../hooks/delete/useDeleteController';
import { TASK_TYPES_FOR_SWITCHER } from './taskForSwitcher';

const Tasks: FC = () => {
  const { storeTask, storePopup, storeTable, storeState, storeAuth } =
    useRootStore();
  const deleteController = useDeleteController();
  const fetchOneTaskAndFillForm = useFetchOneTaskAndFillForm();

  function showViewTaskWindowHandler() {
    fetchOneTaskAndFillForm(
      storeState.interface.currentTypeOfTask,
      'viewTask',
      'Выберите строку, чтобы просмотреть информацию о задаче',
      true,
    );
  }

  function addHandler() {
    storePopup.form.state.formActionType = 'create';
    storePopup.status.show('formTask');
  }

  function changeHandler(): void {
    storePopup.form.state.formActionType = 'update';
    fetchOneTaskAndFillForm(
      storeState.interface.currentTypeOfTask,
      'formTask',
      'Выберите строку, чтобы изменить задачу',
    );
  }

  function deleteHandler() {
    deleteController(
      'tasks',
      storeState.interface.currentTypeOfTask,
      'Выберите строку, чтобы удалить задачу',
    );
  }

  function changeCurrentTypeOfTaskHandler(taskType: TTaskType) {
    storeState.interface.currentTypeOfTask = taskType;
  }

  function fetchTasks(search: string) {
    const typeOfTask = storeState.interface.currentTypeOfTask;
    storeTask.action.fetch(typeOfTask, search, () => {
      storeTable.utils.setDefaultMark(
        'tasks',
        storeTask.state.getTasks(typeOfTask),
        [],
      );
    });
  }

  function searchHandler(newValue: string) {
    fetchTasks(newValue);
  }

  function displayTasksTable(): ReactNode {
    const typeOfTask = storeState.interface.currentTypeOfTask;
    if (storeTask.status.getFetch(typeOfTask) === 'done') {
      if (storeTask.state.getTasks(typeOfTask).length) {
        return (
          <Table
            data={storeTask.state.getTasks(typeOfTask)}
            valuesType='tasks'
            selectingValues={typeOfTask}
            displayedColumns={storeTable.utils.getColumnsWithMark('tasks')}
          />
        );
      }
      return (
        <p className='tasks__empty-text'>Отсутствуют добавленные задачи</p>
      );
    }
    if (storeTask.status.getFetch(typeOfTask) === 'pending') {
      fetchTasks('');
    }
    return <Loader />;
  }

  return (
    <main className='tasks'>
      <div className='tasks__section-button'>
        <SearchField
          searchHandler={searchHandler}
          classes='search-field--tasks'
        />
        {storeAuth.state.userData.role !== 'worker' ? (
          <>
            <ButtonIcon
              src={addIcon}
              clickHandler={addHandler}
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
      <div className='tasks__section-switcher'>
        {TASK_TYPES_FOR_SWITCHER.map(({ type, text }) => (
          <button
            key={type + text}
            className={`tasks__switcher tasks__switcher--${type} ${
              storeState.interface.currentTypeOfTask === type
                ? 'tasks__switcher--active'
                : ''
            }`}
            type='button'
            onClick={() => changeCurrentTypeOfTaskHandler(type)}
          >
            {text}
          </button>
        ))}
      </div>
      <div className='tasks__table'>{displayTasksTable()}</div>
    </main>
  );
};

export default observer(Tasks);
