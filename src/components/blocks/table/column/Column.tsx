import { FC } from 'react';

interface TableColumnProps {
  additionalСlasses?: string;
  text: number | string;
}

const TableColumn: FC<TableColumnProps> = ({ additionalСlasses, text }) => (
  <div className={`table__block ${additionalСlasses}`}>
    <p className='table__text'>{text}</p>
  </div>
);

export default TableColumn;
