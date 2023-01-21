import { FC, useMemo } from 'react';

interface TableColumnProps {
  text: number | string;
}

const TableColumn: FC<TableColumnProps> = ({ text }) => {
  const formatText = useMemo(() => {
    if (document.documentElement.clientWidth < 700) {
      if (String(text).length > 30) {
        return `${String(text).substring(0, 30)}...`;
      }
    }
    return text;
  }, [document.documentElement.clientWidth]);

  return <p className='table__column'>{formatText} </p>;
};

export default TableColumn;
