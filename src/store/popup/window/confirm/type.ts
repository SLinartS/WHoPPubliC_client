import { TMouseButtonEventHandler } from '../../../../types/form/type';

export interface IWindowConfirmSettings {
  title: string;
  firstButtonEvent: TMouseButtonEventHandler;
  secondButtonEvent: TMouseButtonEventHandler;
}
