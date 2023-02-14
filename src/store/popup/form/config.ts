import {
  emptyArrayErrorText,
  emptyFieldErrorText,
} from '@helpers/formValidator/config';

export const INITIAL_VALUE = {
  value: '',
  errors: [emptyFieldErrorText],
};

export const INITIAL_VALUE_TIME_START = {
  value: '08:00',
  errors: [emptyFieldErrorText],
};

export const INITIAL_VALUE_TIME_END = {
  value: '16:00',
  errors: [emptyFieldErrorText],
};

export const INITIAL_ARRAY_VALUE = {
  value: [],
  errors: [emptyArrayErrorText],
};
