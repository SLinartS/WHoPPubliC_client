import { makeAutoObservable } from 'mobx';

import FormArrayValidator from '../../../../utils/formValidator/formArrayValidator';
import RootStore from '../../../root';

export class StorePopupSelectUtils {
  constructor(private readonly root: RootStore) {
    makeAutoObservable(this, {});
  }

  public checkErrorsExist(selectTitle: 'points' | 'floors' | 'products') {
    const validator = new FormArrayValidator(
      this.root.storePopup.select[selectTitle].values,
    ).notEmpty();
    if (validator.errors) {
      this.root.storePopup.select[selectTitle].errors = validator.errors;
    } else {
      this.root.storePopup.select[selectTitle].errors = [];
    }
  }
}
