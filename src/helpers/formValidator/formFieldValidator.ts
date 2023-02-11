import { DateTime } from 'luxon';

import { emptyFieldErrorText } from './config';

export default class FormFieldValidator {
  private _errors: string[];

  public get errors() {
    if (this._errors.length) {
      return this._errors;
    }
    return false;
  }

  constructor(private _value: string) {
    this._errors = [];
  }

  public notEmpty() {
    if (this._value) {
      return this;
    }
    this._errors.push(emptyFieldErrorText);
    return this;
  }

  public maxLength(length: number) {
    if (this._value.length <= length) {
      return this;
    }
    this._errors.push(`Строка должна содержать не более ${length} символов`);
    return this;
  }

  public minLength(length: number) {
    if (this._value.length >= length) {
      return this;
    }
    this._errors.push(`Строка должна содержать не менее ${length} символов`);
    return this;
  }

  public hasOnlyDigits() {
    if (/^\d+$/.test(this._value)) {
      return this;
    }
    this._errors.push(`Поле должно содержать только цифры`);
    return this;
  }

  public hasOnlyLetterAndDigits() {
    if (/^[\da-zA-Zа-яА-яёЁ ]+$/.test(this._value)) {
      return this;
    }
    this._errors.push(`Поле должно содержать только цифры или буквы`);
    return this;
  }

  public dateFormat(format: string, formatAlias: string) {
    if (DateTime.fromFormat(this._value, format).isValid) {
      return this;
    }
    this._errors.push(
      `Дата не соответствует формату «${formatAlias}» или введена несуществующая дата`,
    );
    return this;
  }

  public notBeforeToday() {
    if (
      DateTime.fromFormat(this._value, 'dd.MM.yyyy HH:mm').toMillis() >
      DateTime.now().toMillis()
    ) {
      return this;
    }
    this._errors.push(
      `Нелья указать время начала/окончания меньше, чем сейчас`,
    );
    return this;
  }

  public outOfRange(min: number, max: number) {
    const value = Number(this._value);
    if (value > min && value < max) {
      return this;
    }
    this._errors.push(`Число выходит за диапазон «${min}-${max}»`);
    return this;
  }

  public included(array: string[]) {
    if (array.includes(this._value)) {
      return this;
    }
    this._errors.push('Значение не содержится в списке');
    return this;
  }
}
