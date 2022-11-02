import { ChangeEvent, MouseEventHandler } from 'react';

export type TChangeFieldEvent = ChangeEvent<
  HTMLInputElement | HTMLSelectElement
>;

export type TMouseButtonEvent = MouseEventHandler<HTMLButtonElement>;
