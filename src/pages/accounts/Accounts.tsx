import './style.scss';

import addIcon from '@assets/icons/add.svg';
import deleteIcon from '@assets/icons/delete.svg';
import editIcon from '@assets/icons/edit.svg';
import ButtonIcon from '@components/buttonIcon/ButtonIcon';
import SearchField from '@components/searchField/SearchField';
import Table from '@components/table/Table';
import { useRootStore } from '@helpers/RootStoreProvider/useRootStore';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';

const Accounts = () => {
  const { storeAccount, storeTable } = useRootStore();

  function addHandler() {}

  function changeHandler() {}

  function deleteHandler() {}

  useEffect(() => {
    if (storeAccount.status.get('fetch') === 'pending') {
      storeAccount.actions.fetch(() => {
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
