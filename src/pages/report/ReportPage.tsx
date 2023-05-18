import './style.scss';

import Button from '@components/button/Button';
import Select from '@components/form/field/select/Select';
import LoaderWrapper from '@components/loader/wrapper/Wrapper';
import SearchField from '@components/searchField/SearchField';
import { useRootStore } from '@helpers/RootStoreProvider/useRootStore';
import { IOption } from '@store/category/type';
import { TReportType } from '@store/fileType/type';
import { observer } from 'mobx-react-lite';
import { FC, useEffect, useState } from 'react';

import ReportItem from './item/ReportItem';

const ReportPage: FC = () => {
  const { storeReport, storeFileType } = useRootStore();
  const [selectedReportType, setSelectedReportType] = useState<
    IOption<TReportType>
  >({
    id: 1,
    title: 'performance',
    alias: '',
  });

  function changeSelectHandler(option: IOption<TReportType>) {
    setSelectedReportType(option);
  }

  useEffect(() => {
    storeReport.action.fetch('');
    storeFileType.action.fetch(() => {
      setSelectedReportType({
        id: storeFileType.state.fileTypes[0].id,
        title: storeFileType.state.fileTypes[0].title,
        alias: storeFileType.state.fileTypes[0].alias,
      });
    });
  }, []);

  function searchHandler(newValue: string) {
    storeReport.action.fetch(newValue);
  }

  function generateReportHandler() {
    storeReport.action.store(selectedReportType.title as TReportType, () => {
      storeReport.action.fetch('');
    });
  }

  function downloadReportHandler(id: number, title: string) {
    storeReport.action.download(id, title);
  }

  function deleteReportHandler(id: number) {
    storeReport.action.destroy(id, () => {
      storeReport.action.fetch('');
    });
  }

  function displayReportList() {
    const reports = storeReport.state.reports.filter(
      (report) => report.typeId.value === selectedReportType.id,
    );

    if (reports.length > 0) {
      return reports.map((report) => (
        <ReportItem
          key={report.id.value}
          id={report.id.value}
          title={report.title.value}
          downloadReportHandler={downloadReportHandler}
          deleteReportHandler={deleteReportHandler}
        />
      ));
    }
    return <p className='reports__empty'>Отчёты отсутствуют</p>;
  }

  return (
    <main className='reports'>
      <div className='reports__search'>
        <SearchField searchHandler={searchHandler} />
      </div>
      <div className='reports__button-generate-block'>
        <Select
          changeHandler={changeSelectHandler}
          currentOption={selectedReportType}
          options={storeFileType.state.fileTypes}
        />
        <Button
          text='Сформировать отчёт'
          clickHandler={generateReportHandler}
          classes='reports__button-generate'
        />
      </div>
      <div className='reports__table'>
        <LoaderWrapper status={storeReport.status.get('fetch')}>
          {displayReportList()}
        </LoaderWrapper>
      </div>
    </main>
  );
};

export default observer(ReportPage);
