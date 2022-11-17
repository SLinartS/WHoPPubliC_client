import { makeAutoObservable } from 'mobx';

import RootStore from '../../root';

export class StoreMapUtils {
  constructor(private readonly root: RootStore) {
    makeAutoObservable(this, {});
  }

  public setFloorActive(
    zoneIndex: number,
    sectionIndex: number,
    blockIndex: number,
    floorIndex: number,
    newStatus: boolean,
  ) {
    this.root.storeMap.state.map[zoneIndex].sections[sectionIndex].blocks[
      blockIndex
    ].floors[floorIndex].active = newStatus;

    this.root.storeForm.floorSpace.changeFreeSpace(
      newStatus,
      this.root.storeMap.state.map[zoneIndex].sections[sectionIndex].blocks[
        blockIndex
      ].floors[floorIndex].freeSpace,
    );
  }
}
