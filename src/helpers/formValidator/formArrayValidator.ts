export default class FormArrayValidator {
  private _errors: string[];

  public get errors() {
    if (this._errors.length) {
      return this._errors;
    }
    return false;
  }

  constructor(private _array: Array<any>) {
    this._errors = [];
  }

  public notEmpty() {
    if (this._array.length) {
      return this;
    }
    this._errors.push('Точки не выбраны');
    return this;
  }

  public maxLength(length: number) {
    if (this._array.length < length) {
      return this;
    }
    this._errors.push(`Строка должна содержать менее ${length} символов`);
    return this;
  }
}
