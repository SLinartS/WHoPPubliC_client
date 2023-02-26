import './style.scss';

import addIcon from '@assets/icons/add.svg';
import deleteIcon from '@assets/icons/delete.svg';
import editIcon from '@assets/icons/edit.svg';
import ButtonIcon from '@components/buttonIcon/ButtonIcon';
import Loader from '@components/loader/Loader';
import SearchField from '@components/searchField/SearchField';
import Table from '@components/table/Table';
import { useRootStore } from '@helpers/RootStoreProvider/useRootStore';
import { useFetchOneUserAndFillForm } from '@hooks/user/useFetchOneUserAndFillForm';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';

import { useDeleteController } from '../hooks/delete/useDeleteController';

const Users = () => {
  const { storeUser, storeTable, storePopup } = useRootStore();
  const fetchOneUserAndFillForm = useFetchOneUserAndFillForm();
  const deleteController = useDeleteController();

  function addHandler() {
    storePopup.form.state.formActionType = 'create';
    storePopup.status.show('formUser');
  }

  function searchHandler(newValue: string) {
    storeUser.action.fetch(newValue);
  }

  function changeHandler() {
    storePopup.form.state.formActionType = 'update';
    storePopup.form.user.setFormError('password', []);
    fetchOneUserAndFillForm(
      'formUser',
      'Выберите строку, чтобы изменить данные аккаунта пользователя',
    );
  }

  function deleteHandler() {
    deleteController(
      'users',
      'users',
      'Выберите строку, чтобы удалить аккаунт пользователя',
    );
  }

  useEffect(() => {
    if (storeUser.status.get('fetch') === 'pending') {
      storeUser.action.fetch('', () => {
        storeTable.utils.setDefaultMark('users', storeUser.state.users, [
          'password',
          'roleId',
        ]);
      });
    }
  }, [storeUser.status.get('fetch')]);

  return (
    <main className='users'>
      <div className='users__section-button'>
        <SearchField
          searchHandler={searchHandler}
          classes='search-field--users'
        />

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
      </div>

      <div className='users__table'>
        {storeUser.status.get('fetch') === 'done' ? (
          <Table
            data={storeUser.state.users}
            valuesType='users'
            selectingValues='users'
            classes='table--users'
            displayedColumns={storeTable.utils.getColumnsWithMark('users')}
          />
        ) : (
          <Loader />
        )}
      </div>
    </main>
  );
};

export default observer(Users);
