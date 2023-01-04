import { observer } from 'mobx-react-lite';
import { FC } from 'react';

import searchIcon from '../../../assets/icons/search.svg';

interface ISarchFieldProps {
  searchedItemType?: 'products' | 'tasks';
}

const SearchField: FC<ISarchFieldProps> = observer(
  ({ searchedItemType = 'products' }) => {
    return (
      <div className='search-field'>
        <img
          src={searchIcon}
          className='search-field__icon'
          alt='search'
        />
        <input
          type='text'
          className='search-field__input'
        />
      </div>
    );
  },
);

export default SearchField;
