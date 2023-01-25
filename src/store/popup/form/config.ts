import {
  emptyArrayErrorText,
  emptyFieldErrorText,
} from '@helpers/formValidator/config';

export const INITIAL_VALUE = {
  value: '',
  errors: [emptyFieldErrorText],
};

export const INITIAL_ARRAY_VALUE = {
  value: [],
  errors: [emptyArrayErrorText],
};
