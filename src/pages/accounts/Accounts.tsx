import './style.scss';

import addIcon from '@assets/icons/add.svg';
import deleteIcon from '@assets/icons/delete.svg';
import editIcon from '@assets/icons/edit.svg';
import ButtonIcon from '@components/buttonIcon/ButtonIcon';
import SearchField from '@components/searchField/SearchField';
import Table from '@components/table/Table';
import { useRootStore } from '@helpers/RootStoreProvider/useRootStore';
import { useFetchOneAccountAndFillForm } from '@hooks/account/useFetchOneAccountAndFillForm';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';

import { useDeleteController } from '../hooks/delete/useDeleteController';

const Accounts = () => {
  const { storeAccount, storeTable, storePopup } = useRootStore();
  const fetchOneAccountAndFillFormHook = useFetchOneAccountAndFillForm();
  const deleteControllerHook = useDeleteController();

  function addHandler() {
    storePopup.form.state.formActionType = 'create';
    storePopup.status.show('formAccount');
  }

  function changeHandler() {
    storePopup.form.state.formActionType = 'change';
    storePopup.form.account.setFormError('password', []);
    fetchOneAccountAndFillFormHook(
      'formAccount',
      'Выберите строку, чтобы изменить данные аккаунта пользователя',
    );
  }

  function deleteHandler() {
    deleteControllerHook(
      'accounts',
      'accounts',
      'Выберите строку, чтобы удалить аккаунт пользователя',
    );
  }

  useEffect(() => {
    if (storeAccount.status.get('fetch') === 'pending') {
      storeAccount.action.fetch(() => {
        storeTable.utils.setDefaulMark(
          'accounts',
          storeAccount.state.accounts,
          [],
        );
      });
    }
  }, [storeAccount.status.get('fetch')]);

  return (
    <main className='accounts'>
      <div className='accounts__section-button'>
        <SearchField classes='search-field--accounts' />

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

      <div className='accounts__table'>
        {storeAccount.status.get('fetch') === 'done' && (
          <Table
            data={storeAccount.state.accounts}
            valuesType='accounts'
            selectingValues='accounts'
            classes='table--accounts'
            displayedColumns={storeTable.utils.getColumnsWithMark('accounts')}
          />
        )}
      </div>
    </main>
  );
};

export default observer(Accounts);
