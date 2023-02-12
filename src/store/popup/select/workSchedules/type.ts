import { TValueOrErrorType } from '@store/type';

export type TWorkScheduleSelectData = {
  [key in TDayOfWeek]: IOneWorkScheduleSelectData;
};

export interface IOneWorkScheduleSelectData {
  startTime: TValueOrErrorType;
  endTime: TValueOrErrorType;
}

export type TDayOfWeek = 0 | 1 | 2 | 3 | 4 | 5 | 6;
