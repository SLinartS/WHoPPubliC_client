import { TMouseImgEventHandler } from '../../../types/form/type';

export interface IIconButtonProps {
  eventHandler: TMouseImgEventHandler;
  iconType: TIconButtonTypes;
}

export type TIconButtonTypes = 'back' | 'close' | 'save';
