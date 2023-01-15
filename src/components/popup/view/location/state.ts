import { makeAutoObservable } from 'mobx';

import { TInformationOfViewLocation } from './type';

class LocalViewLocationState {
  constructor() {
    makeAutoObservable(this, {});
  }

  private typeOfInformation: TInformationOfViewLocation = 'acceptancePoint';

  public getTypeOfInformation(): TInformationOfViewLocation {
    return this.typeOfInformation;
  }

  public setTypeOfInformation(newType: TInformationOfViewLocation): void {
    this.typeOfInformation = newType;
  }
}

export const localViewLocationState = new LocalViewLocationState();
