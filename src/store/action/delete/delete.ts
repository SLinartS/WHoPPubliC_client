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
      switch (taskType) {
        case 'acceptanceTasks':
          this.root.storeTask.fetch.acceptanceTasks(() => {
            this.root.storeTable.selectedItem.setItemId(
              'acceptanceTasks',
              this.root.storeTask.state.acceptanceList.data[0].id.value,
            );
          });
          break;
        case 'intraTasks':
          this.root.storeTask.fetch.intraTasks(() => {
            this.root.storeTable.selectedItem.setItemId(
              'intraTasks',
              this.root.storeTask.state.intraList.data[0].id.value,
            );
          });
          break;
        case 'shipmentTasks':
          this.root.storeTask.fetch.shipmentTasks(() => {
            this.root.storeTable.selectedItem.setItemId(
              'shipmentTasks',
              this.root.storeTask.state.shipmentList.data[0].id.value,
            );
          });
          break;
        default:
      }
    });
  }

  private deleteProduct(productId: number): void {
    this.root.storePopup.windows.confirm.setting = {
      title: `Удалить товар Id:${productId}?`,
      firstButtonEvent: () => {
        this.root.storeProduct.delete.product(productId, () => {
          this.root.storeProduct.fetch.products(() => {
            this.root.storeTable.selectedItem.setItemId(
              'products',
              this.root.storeProduct.state.products.data[0].id.value,
            );
          });
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
