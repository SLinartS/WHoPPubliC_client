import './style.scss';

import searchIcon from '@assets/icons/search.svg';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';

interface ISarchFieldProps {
  searchedItemType?: 'products' | 'tasks';
  classes?: string;
}

const SearchField: FC<ISarchFieldProps> =
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ({ searchedItemType = 'products', classes }) => {
    return (
      <div className={`search-field ${classes}`}>
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
  };

export default observer(SearchField);
