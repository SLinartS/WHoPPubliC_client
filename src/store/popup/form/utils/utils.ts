import { makeAutoObservable } from 'mobx';

import { ITableObject } from '../../../../components/blocks/table/type';
import { IProduct } from '../../../product/type';
import RootStore from '../../../root';

export class StorePopupFormUtils {
  constructor(private readonly root: RootStore) {
    makeAutoObservable(this, {});
  }

  public getTaskTypeId(): string {
    switch (this.root.storeState.interface.getCurrentTypeOfTask()) {
      case 'acceptance':
        return '1';
      case 'intra':
        return '3';
      case 'shipment':
        return '2';
      default:
        return '1';
    }
  }

  public resetForm(): void {
    this.root.storePopup.select.points.clearArray();
    this.root.storePopup.select.floors.clearArray();
    this.root.storePopup.select.floors.clearArray();
    this.root.storePopup.select.products.clearProductList();
    this.root.storePopup.form.task.clearFormData();
    this.root.storeProduct.status.set('add', 'pending');
    this.root.storeProduct.status.set('fetch', 'pending');
    this.root.storePoint.status.set('fetch', 'pending');
    this.root.storeCategory.status.set('fetch', 'pending');
    this.root.storeTask.status.set('add', 'pending');
    this.root.storePopup.form.state.isDisplayDefaultErrors = false;
  }

  public getFilteredProducts(productArray: IProduct[]) {
    const filteredProducts: ITableObject[] = [];
    for (const product of productArray) {
      let filteredColumns: ITableObject = { id: product.id };
      for (const [key, column] of Object.entries(product)) {
        const typedKey: keyof IProduct = key;

        filteredColumns[typedKey] = column;
      }
      filteredProducts.push(filteredColumns);
      filteredColumns = { id: { value: 0, alias: 'ID' } };
    }
    return filteredProducts;
  }

  public getUnselectedProducts() {
    let unselectedProducts: IProduct[] =
      this.root.storeProduct.state.products.data.filter(
        (product) =>
          !this.root.storePopup.select.products.arrayValue.includes(
            product.id.value,
          ),
      );
    unselectedProducts = this.getProductsWithoutLinkToTask(unselectedProducts);
    return unselectedProducts;
  }

  private getProductsWithoutLinkToTask(
    unselectedProducts: IProduct[],
  ): IProduct[] {
    const idsProductsWithoutLinkToTask: number[] =
      this.root.storeProduct.state.products.serviceInformation
        .filter((product) => product.isLinkedToTask === false)
        .map((product) => product.productId);

    const productsWithoutLinkToTask: IProduct[] = unselectedProducts.filter(
      ($product) => idsProductsWithoutLinkToTask.includes($product.id.value),
    );

    return productsWithoutLinkToTask;
  }
}
