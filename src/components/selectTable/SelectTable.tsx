import './style.scss';

import { TMarkType } from '@store/state/type';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';

import CheckMark from '../checkMark/CheckMark';

interface ISelectTableProps {
  checkMarkValue: string;
  alias: string;
  value: string;
  mark: TMarkType;
}

const SelectTable: FC<ISelectTableProps> = ({
  checkMarkValue,
  alias,
  value,
  mark,
}) => {
  return (
    <div className='select-table'>
      <CheckMark
        value={checkMarkValue}
        text={alias}
        mark={mark}
      />
      <textarea
        className='select-table__input'
        defaultValue={value}
      />
    </div>
  );
};

export default observer(SelectTable);
