import './style.scss';

import Button from '@components/button/Button';
import Loader from '@components/loader/Loader';
import SearchField from '@components/searchField/SearchField';
import { useRootStore } from '@helpers/RootStoreProvider/useRootStore';
import { observer } from 'mobx-react-lite';
import { FC, useEffect } from 'react';

import PerformanceReportItem from './item/PerformanceReportItem';

const PerformanceReport: FC = () => {
  const { storePerformanceReport } = useRootStore();

  useEffect(() => {
    storePerformanceReport.action.fetch('');
  }, []);

  function searchHandler(newValue: string) {
    storePerformanceReport.action.fetch(newValue);
  }

  function generateReportHandler() {
    storePerformanceReport.action.store(() => {
      storePerformanceReport.action.fetch('');
    });
  }

  function downloadReportHandler(id: number, title: string) {
    storePerformanceReport.action.download(id, title);
  }

  function deleteReportHandler(id: number) {
    storePerformanceReport.action.destroy(id, () => {
      storePerformanceReport.action.fetch('');
    });
  }

  return (
    <main className='performance-reports'>
      <div className='performance-reports__search'>
        <SearchField searchHandler={searchHandler} />
      </div>
      <div className='performance-reports__button-generate-block'>
        <Button
          text='Сформировать отчёт'
          clickHandler={generateReportHandler}
          classes='performance-reports__button-generate'
        />
      </div>
      <div className='performance-reports__table'>
        {storePerformanceReport.status.get('fetch') === 'done' ? (
          storePerformanceReport.state.reports.map((report) => (
            <PerformanceReportItem
              key={report.id}
              id={report.id}
              title={report.title.substring(19)}
              downloadReportHandler={downloadReportHandler}
              deleteReportHandler={deleteReportHandler}
            />
          ))
        ) : (
          <Loader />
        )}
      </div>
    </main>
  );
};

export default observer(PerformanceReport);
