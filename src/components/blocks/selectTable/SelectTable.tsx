import { observer } from 'mobx-react-lite';
import { FC } from 'react';

import { TMarkType } from '../../../store/state/type';
import CheckMark from '../checkMark/CheckMark';

interface ISelectTableProps {
  checkMarkValue: string;
  alias: string;
  value: string;
  mark: TMarkType;
}

const SelectTable: FC<ISelectTableProps> = observer(
  ({ checkMarkValue, alias, value, mark }) => {
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
  },
);

export default SelectTable;
