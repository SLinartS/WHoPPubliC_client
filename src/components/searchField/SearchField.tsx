import './style.scss';

import searchIcon from '@assets/icons/search/search-second.svg';
import { TChangeFieldEvent } from '@gtypes/form/type';
import { observer } from 'mobx-react-lite';
import { FC, useState } from 'react';

interface ISarchFieldProps {
  searchHandler?: (newValue: string) => void;
  classes?: string;
}

const SearchField: FC<ISarchFieldProps> = ({ searchHandler, classes }) => {
  const [value, setValue] = useState<string>('');
  const [searchDelayer, setSearchDelayer] = useState<NodeJS.Timeout | null>(
    null,
  );

  function changeFieldHandler(e: TChangeFieldEvent) {
    setValue(e.target.value);
    if (searchDelayer) {
      clearTimeout(searchDelayer);
    }
    setSearchDelayer(
      setTimeout(() => {
        searchHandler!(e.target.value);
      }, 1000),
    );
  }

  return (
    <div className={`search-field ${classes}`}>
      <img
        src={searchIcon}
        className='search-field__icon'
        alt='search'
        onClick={() => searchHandler!(value)}
        draggable={false}
      />
      <input
        type='text'
        value={value}
        onChange={changeFieldHandler}
        className='search-field__input'
      />
    </div>
  );
};

export default observer(SearchField);
