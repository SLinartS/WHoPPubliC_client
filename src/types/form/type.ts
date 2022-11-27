import { ChangeEvent, ChangeEventHandler, MouseEventHandler } from 'react';

export type TChangeFieldEvent = ChangeEvent<
  HTMLInputElement | HTMLSelectElement
>;

export type TChangeFieldHandler = ChangeEventHandler<
  HTMLInputElement | HTMLSelectElement
>;

export type TMouseButtonEventHandler = MouseEventHandler<HTMLButtonElement>;

export type TMouseDivEventHandler = MouseEventHandler<HTMLDivElement>;
