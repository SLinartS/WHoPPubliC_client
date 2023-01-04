import { makeAutoObservable } from 'mobx';

import RootStore from '../../root';
import { ISelectedItems } from '../../table/selectedItem/type';

export class StoreActionDelete {
  constructor(private readonly root: RootStore) {
    makeAutoObservable(this, {});
  }

  public deleteController(itemType: keyof ISelectedItems) {
    const itemId = this.root.storeTable.selectedItem.getItemId(itemType);
    if (itemId === 0) {
      this.root.storePopup.windows.information.setting = {
        text: 'Выберите строку, чтобы её удалить',
      };
      this.root.storePopup.status.showWindowInformation();
    } else {
      switch (itemType) {
        case 'acceptanceTasks':
        case 'shipmentTasks':
          this.deleteTaskShell(itemType, itemId);
          break;
        case 'products':
          this.deleteProduct(itemId);
          break;
        default:
      }
    }
  }

  private deleteTaskShell(taskType: keyof ISelectedItems, taskId: number) {
    this.root.storePopup.windows.confirm.setting = {
      title: `Удалить задачу Id:${taskId}?`,
      firstButtonEvent: () => {
        this.root.storePopup.status.hideWindowConfirm(() => {
          this.root.storePopup.windows.confirm.setting = {
            title: `Удалить связанные с задачей товары?`,
            firstButtonEvent: () => {
              this.deleteTask(taskType, taskId, true);
              this.root.storePopup.status.hideWindowConfirm();
            },
            secondButtonEvent: () => {
              this.deleteTask(taskType, taskId, false);
              this.root.storePopup.status.hideWindowConfirm();
            },
          };
          this.root.storePopup.status.showWindowConfirm();
        });
      },
      secondButtonEvent: () => {
        this.root.storePopup.status.hideWindowConfirm();
      },
    };
    this.root.storePopup.status.showWindowConfirm();
  }

  private deleteTask(
    taskType: keyof ISelectedItems,
    taskId: number,
    isDeleteProducts: boolean,
  ): void {
    this.root.storeTask.delete.task(taskId, isDeleteProducts, () => {
      this.root.storePopup.status.hideWindowConfirm();
      if (taskType === 'acceptanceTasks') {
        this.root.storeTask.status.set('fetchAcceptance', 'pending');
      }
      if (taskType === 'shipmentTasks') {
        this.root.storeTask.status.set('fetchShipment', 'pending');
      }
    });
  }

  private deleteProduct(productId: number): void {
    this.root.storePopup.windows.confirm.setting = {
      title: `Удалить задачу Id:${productId}?`,
      firstButtonEvent: () => {
        this.root.storeProduct.delete.product(productId, () => {
          this.root.storeProduct.fetch.products();
          this.root.storePopup.status.hideWindowConfirm();
        });
      },
      secondButtonEvent: () => {
        this.root.storePopup.status.hideWindowConfirm();
      },
    };
    this.root.storePopup.status.showWindowConfirm();
  }
}
