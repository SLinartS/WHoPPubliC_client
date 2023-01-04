import { observer } from 'mobx-react-lite';
import { FC } from 'react';
import CheckMark from '../checkMark/CheckMark';

// interface ISelectTableProps {
//   checkMarkValue: string;
// }

const SelectTable: FC = observer(() => {
  return (
    <div className='select-table'>
      <CheckMark
        value='placeholder'
        text='placeholder'
      />
    </div>
  );
});

export default SelectTable;
