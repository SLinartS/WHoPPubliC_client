import Button from '@components/button/Button';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';

interface ReportItemProps {
  id: number;
  title: string;
  downloadReportHandler: (id: number, title: string) => void;
  deleteReportHandler: (id: number) => void;
}

const ReportItem: FC<ReportItemProps> = ({
  id,
  title,
  downloadReportHandler,
  deleteReportHandler,
}) => {
  return (
    <>
      <p className='reports__report-title'>
        {title.split('-').splice(2).join('-')}
      </p>
      <Button
        text='Скачать'
        clickHandler={() => downloadReportHandler(id, title)}
        classes='reports__report-button'
      />
      <Button
        text='Удалить'
        clickHandler={() => deleteReportHandler(id)}
        classes='reports__report-button'
      />
    </>
  );
};

export default observer(ReportItem);
