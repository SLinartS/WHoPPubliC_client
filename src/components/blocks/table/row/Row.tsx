import { observer } from 'mobx-react-lite';
import { FC } from 'react';

import { IProductForTable } from '../../../../store/form/product/type';
import { IProduct } from '../../../../store/products/type';
import { ITask } from '../../../../store/tasks/type';
import TableColumn from '../column/Column';

interface IRowProps {
  columns: ITask | IProduct | IProductForTable;
}

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
