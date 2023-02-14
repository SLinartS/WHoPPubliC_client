import FormFieldValidator from '@helpers/formValidator/formFieldValidator';
import {
  INITIAL_VALUE_TIME_END,
  INITIAL_VALUE_TIME_START,
} from '@store/popup/form/config';
import { makeAutoObservable } from 'mobx';

import deepCopy from '../../../../utils/deepCopy/deepCopy';
import RootStore from '../../../root';
import { IOneWorkScheduleSelectData, TWorkScheduleSelectData } from './type';

export class StorePopupSelectWorkSchedules {
  constructor(private readonly root: RootStore) {
    makeAutoObservable(this, {});
  }

  private readonly initialWorkSchedule: IOneWorkScheduleSelectData = {
    startTime: INITIAL_VALUE_TIME_START,
    endTime: INITIAL_VALUE_TIME_END,
  };

  private readonly initialFormData: TWorkScheduleSelectData = {
    '0': deepCopy(this.initialWorkSchedule),
    '1': deepCopy(this.initialWorkSchedule),
    '2': deepCopy(this.initialWorkSchedule),
    '3': deepCopy(this.initialWorkSchedule),
    '4': deepCopy(this.initialWorkSchedule),
    '5': deepCopy(this.initialWorkSchedule),
    '6': deepCopy(this.initialWorkSchedule),
  };

  private _workSchedules: TWorkScheduleSelectData = deepCopy(
    this.initialFormData,
  );

  public get workSchedules() {
    return this._workSchedules;
  }

  public getFieldWorkScheduleValue(
    indexDayOfWeek: keyof TWorkScheduleSelectData,
    field: keyof IOneWorkScheduleSelectData,
  ) {
    return this._workSchedules[indexDayOfWeek][field].value;
  }

  public getFieldWorkScheduleError(
    indexDayOfWeek: keyof TWorkScheduleSelectData,
    field: keyof IOneWorkScheduleSelectData,
  ) {
    return this._workSchedules[indexDayOfWeek][field].errors;
  }

  public setFieldWorkScheduleValue(
    indexDayOfWeek: keyof TWorkScheduleSelectData,
    field: keyof IOneWorkScheduleSelectData,
    newValue: string,
  ) {
    const trimValue = newValue.trim();
    const validator = new FormFieldValidator(trimValue);
    switch (field) {
      case 'startTime':
        validator.notEmpty().dateFormat('HH:mm', 'чч:мм');
        break;

      case 'endTime':
        validator.notEmpty().dateFormat('HH:mm', 'чч:мм');
        break;

      default:
    }
    this._workSchedules[indexDayOfWeek][field].value = trimValue;
    this.checkErrorsExist(validator.errors, indexDayOfWeek, field);
  }

  public setWorkSchedule(newWorkSchedule: TWorkScheduleSelectData) {
    this._workSchedules = newWorkSchedule;
  }

  public clear() {
    this._workSchedules = deepCopy(this.initialFormData);
  }

  private checkErrorsExist(
    errors: string[] | false,
    indexDayOfWeek: keyof TWorkScheduleSelectData,
    field: keyof IOneWorkScheduleSelectData,
  ) {
    if (errors) {
      this._workSchedules[indexDayOfWeek][field].errors = errors;
    } else {
      this._workSchedules[indexDayOfWeek][field].errors = [];
    }
  }
}
