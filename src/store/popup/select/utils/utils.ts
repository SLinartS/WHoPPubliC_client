import { makeAutoObservable } from 'mobx';

import FormArrayValidator from '../../../../utils/formValidator/formArrayValidator';
import RootStore from '../../../root';

export class StorePopupSelectUtils {
  constructor(private readonly root: RootStore) {
    makeAutoObservable(this, {});
  }

  public checkErrorsExist(
    selectTitle: 'points' | 'warehousePoints' | 'products',
  ) {
    const validator = new FormArrayValidator(
      this.root.storePopup.select[selectTitle].arrayErrors,
    ).notEmpty();
    if (validator.errors) {
      this.root.storePopup.select[selectTitle].arrayErrors = validator.errors;
    } else {
      this.root.storePopup.select[selectTitle].arrayErrors = [];
    }
  }
}
