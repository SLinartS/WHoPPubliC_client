import { TValueOrErrorType } from '../../../type';

export interface ITaskFormDataFields {
  id: TValueOrErrorType;
  article: TValueOrErrorType;
  dateStart: TValueOrErrorType;
  dateEnd: TValueOrErrorType;
}

export interface ITaskFormFields {
  article: string;
  dateStart: string;
  dateEnd: string;
}
