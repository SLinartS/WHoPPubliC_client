import Button from '@components/button/Button';
import { observer } from 'mobx-react-lite';
import React, { FC } from 'react';

interface PerformanceReportItemProps {
  id: number;
  title: string;
  downloadReportHandler: (id: number, title: string) => void;
  deleteReportHandler: (id: number) => void;
}

const PerformanceReportItem: FC<PerformanceReportItemProps> = ({
  id,
  title,
  downloadReportHandler,
  deleteReportHandler,
}) => {
  return (
    <>
      <p className='performance-reports__report-title'>{title}</p>
      <Button
        text='Скачать'
        clickHandler={() => downloadReportHandler(id, title)}
        classes='performance-reports__report-button'
      />
      <Button
        text='Удалить'
        clickHandler={() => deleteReportHandler(id)}
        classes='performance-reports__report-button'
      />
    </>
  );
};

export default observer(PerformanceReportItem);
