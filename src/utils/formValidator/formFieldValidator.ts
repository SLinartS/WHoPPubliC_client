import { DateTime } from 'luxon';

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
    this._errors.push('Строка значения пуста');
    return this;
  }

  public maxLength(length: number) {
    if (this._value.length < length) {
      return this;
    }
    this._errors.push(`Строка должна содержать менее ${length} символов`);
    return this;
  }

  public minLength(length: number) {
    if (this._value.length > length) {
      return this;
    }
    this._errors.push(`Строка должна содержать более ${length} символов`);
    return this;
  }

  public dateFormat(format: string) {
    if (DateTime.fromFormat(this._value, format).isValid) {
      return this;
    }
    this._errors.push(`Дата не соответствует формату "${format}"`);
    return this;
  }

  public outOfRange(min: number, max: number) {
    const value = Number(this._value);
    if (value > min && value < max) {
      return this;
    }
    this._errors.push(`Число выходит за диапазон "${min}-${max}"`);
    return this;
  }

  public included(array: string[]) {
    if (array.includes(this._value)) {
      return this;
    }
    this._errors.push('Значение не содержится в списке');
    return this;
  }

  public categorySelected() {
    if (this._value !== 'unset') {
      return this;
    }
    this._errors.push('Категория издания не выбрана');
    return this;
  }
}
