import { ChangeEventHandler } from 'react';

export interface IFormFieldInputProps {
  additionalСlasses?: string;
  value: string;
  changeEvent: ChangeEventHandler<HTMLInputElement | HTMLSelectElement>;
}
