import { makeAutoObservable } from 'mobx';

import RootStore from '../../../root';
import { TValueOrErrorType } from '../../../type';

export class StoreFormProductUtils {
  constructor(private readonly root: RootStore) {
    makeAutoObservable(this, {});
  }

  public checkProductErrors(): boolean {
    const fields = this.root.storeForm.product.field.formData;
    for (const value of Object.values(fields)) {
      const typedValue: TValueOrErrorType = value;
      if (typedValue.errors.length) {
        return true;
      }
    }
    return false;
  }
}
