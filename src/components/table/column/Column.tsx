import { observer } from 'mobx-react-lite';
import { FC, useMemo } from 'react';

interface TableColumnProps {
  text: number | string;
}

const TableColumn: FC<TableColumnProps> = ({ text }) => {
  const formatText = useMemo(() => {
    if (
      (document.documentElement.clientWidth < 700 &&
        String(text).length > 30) ||
      String(text).length > 30
    ) {
      return `${String(text).substring(0, 30)}...`;
    }
    return text;
  }, [document.documentElement.clientWidth, text]);

  return <p className='table__column'>{formatText} </p>;
};

export default observer(TableColumn);
