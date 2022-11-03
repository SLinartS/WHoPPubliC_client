import { FC, useEffect, useState } from 'react';

interface TableColumnProps {
  additionalСlasses?: string;
  text: number | string;
}

const TableColumn: FC<TableColumnProps> = ({ additionalСlasses, text }) => {
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

  return (
    <div className={`table__block ${additionalСlasses}`}>
      <p className='table__text'>{formatText}</p>
    </div>
  );
};

export default TableColumn;
