import AssembledBlockFieldTime from '@components/form/assembled/BlockFieldTime';
import Loader from '@components/loader/Loader';
import WindowHeaderForm from '@components/windowHeader/form/Form';
import { getDayOfWeekByIndex } from '@helpers/getDayOfWeekByIndex/getDayOfWeekByIndex';
import { useRootStore } from '@helpers/RootStoreProvider/useRootStore';
import {
  IOneWorkScheduleSelectData,
  TDayOfWeek,
} from '@store/popup/select/workSchedules/type';
import { observer } from 'mobx-react-lite';

const PopupSelectWorkSchedule = () => {
  const { storeUser, storePopup } = useRootStore();

  function changeFieldHandler(
    newValue: string,
    fieldName: keyof IOneWorkScheduleSelectData,
    additionalInformation: TDayOfWeek,
  ) {
    storePopup.select.workSchedules.setFieldWorkScheduleValue(
      additionalInformation,
      fieldName,
      newValue,
    );
  }

  function saveHandler() {
    storePopup.status.hide('selectWorkSchedule');
  }

  function closeHandler() {
    storePopup.status.hide('selectWorkSchedule');
  }

  return (
    <>
      <WindowHeaderForm
        title='Установить график работы'
        saveEventHandler={saveHandler}
        closeEventHandler={closeHandler}
      />
      <div className='popup-select__content'>
        {storeUser.status.get('show') === 'done' ? (
          <div className='popup-select__work-schedule'>
            <div className='popup-select__work-schedule-item'>
              <p />
              <p>Начало</p>
              <p>Конец</p>
            </div>
            {(
              Object.keys(
                storePopup.select.workSchedules.workSchedules,
              ) as unknown as TDayOfWeek[]
            ).map((indexDayOfWeek) => (
              <div
                className='popup-select__work-schedule-item'
                key={indexDayOfWeek}
              >
                <p>{getDayOfWeekByIndex(indexDayOfWeek)}</p>
                <AssembledBlockFieldTime
                  value={storePopup.select.workSchedules.getFieldWorkScheduleValue(
                    indexDayOfWeek,
                    'startTime',
                  )}
                  errors={storePopup.select.workSchedules.getFieldWorkScheduleError(
                    indexDayOfWeek,
                    'startTime',
                  )}
                  changeHandler={changeFieldHandler}
                  typeForm='work-schedule'
                  fieldName='startTime'
                  additionalInformation={indexDayOfWeek}
                  placeholder='08:00'
                />
                <AssembledBlockFieldTime
                  value={storePopup.select.workSchedules.getFieldWorkScheduleValue(
                    indexDayOfWeek,
                    'endTime',
                  )}
                  errors={storePopup.select.workSchedules.getFieldWorkScheduleError(
                    indexDayOfWeek,
                    'endTime',
                  )}
                  changeHandler={changeFieldHandler}
                  typeForm='work-schedule'
                  fieldName='endTime'
                  additionalInformation={indexDayOfWeek}
                  placeholder='16:00'
                />
              </div>
            ))}
          </div>
        ) : (
          <Loader />
        )}
      </div>
    </>
  );
};

export default observer(PopupSelectWorkSchedule);
