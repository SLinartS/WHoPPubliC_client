import './style.scss';

import { observer } from 'mobx-react-lite';
import { FC } from 'react';

interface ISarchFieldProps {
  searchedItemType?: 'products' | 'tasks';
}

const SearchField: FC<ISarchFieldProps> = observer(
  ({ searchedItemType = 'products' }) => {
    return (
      <div className='search-field'>
        <p className='search-field__title'>Поиск: </p>
        <input
          type='text'
          className='search-field__input'
        />
      </div>
    );
  },
);

export default SearchField;
