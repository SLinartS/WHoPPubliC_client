import { observer } from 'mobx-react-lite';
import { FC } from 'react';

import TableColumn from './TableColumn';
import { IRowProps } from './type';

const TableRow: FC<IRowProps> = observer(({ columns }) => (
  <>
    {Object.entries(columns).map(([key, value]) => (
      <TableColumn
        key={key + value}
        text={value}
        additionalСlasses='table__block--row'
      />
    ))}
  </>
));

export default TableRow;
