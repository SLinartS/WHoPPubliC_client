import { FC, useEffect, useState } from 'react';

interface TableColumnProps {
  text: number | string;
}

const TableColumn: FC<TableColumnProps> = ({ text }) => {
  const [formatText, setFormatText] = useState(text);

  useEffect(() => {
    if (document.documentElement.clientWidth < 950) {
      if (String(text).length > 11) {
        setFormatText(`${String(text).substring(0, 11)}...`);
      }
    } else {
      setFormatText(text);
    }
  }, [text]);

  return <p className='table__column'>{formatText} </p>;
};

export default TableColumn;
