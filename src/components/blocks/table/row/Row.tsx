import { observer } from 'mobx-react-lite';

import TableColumn from '../column/Column';

interface IRowProps<T> {
  columns: T;
}

export default observer(function TableRow<T extends object>({
  columns,
}: IRowProps<T>) {
  return (
    <>
      {Object.entries(columns).map(([key, value]) => (
        <TableColumn
          key={key + value}
          text={value}
          additionalСlasses='table__block--row'
        />
      ))}
    </>
  );
});
