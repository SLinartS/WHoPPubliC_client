import { ChangeEvent, ChangeEventHandler, MouseEventHandler } from 'react';

export type TChangeFieldEvent = ChangeEvent<
  HTMLInputElement | HTMLSelectElement
>;

export type TChangeFieldHandler = ChangeEventHandler<
  HTMLInputElement | HTMLSelectElement
>;

export type TMouseButtonEvent = MouseEventHandler<HTMLButtonElement>;
