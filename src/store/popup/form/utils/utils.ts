import { makeAutoObservable } from 'mobx';

import { IProduct, IProductTypeValues } from '../../../product/type';
import RootStore from '../../../root';

export class StorePopupFormUtils {
  constructor(private readonly root: RootStore) {
    makeAutoObservable(this, {});
  }

  public getTaskTypeId(): string {
    if (this.root.storePopup.form.state.currentTaskType === 'acceptance') {
      return '1';
    }
    return '2';
  }

  public resetForm(): void {
    this.root.storePopup.select.points.clearArray();
    this.root.storePopup.select.warehousePoints.clearArray();
    this.root.storePopup.select.warehousePoints.clearArray();
    this.root.storePopup.select.products.clearProductList();
    this.root.storePopup.form.task.clearFormData();
    this.root.storeProduct.status.set('add', 'pending');
    this.root.storeProduct.status.set('fetch', 'pending');
    this.root.storePoint.status.set('fetch', 'pending');
    this.root.storeCategory.status.set('fetch', 'pending');
    this.root.storeTask.status.set('add', 'pending');
    this.root.storePopup.form.state.isDisplayDefaultErrors = false;
  }

  public getFilteredProducts(
    productArray: IProduct[],
    excludeColumns: Array<keyof IProduct>,
    excludeColumnsHeader: string[],
  ) {
    const filteredProducts: IProductTypeValues[] = [];
    for (const product of productArray) {
      let filteredColumns: IProductTypeValues = { id: product.id };
      for (const [key, column] of Object.entries(product)) {
        const typedKey: keyof IProduct = key;
        if (!excludeColumns.includes(typedKey) && key !== 'id') {
          filteredColumns[typedKey] = column;
        }
      }
      filteredProducts.push(filteredColumns);
      filteredColumns = { id: 0 };
    }

    const filteredProductHeader: string[] =
      this.root.storeProduct.state.products.tableHeader.filter(
        (columnHeader) => !excludeColumnsHeader.includes(columnHeader),
      );

    return { filteredProducts, filteredProductHeader };
  }

  public getUnselectedProducts() {
    let unselectedProducts: IProduct[] =
      this.root.storeProduct.state.products.data.filter(
        (product) =>
          !this.root.storePopup.select.products.arrayValue.includes(product.id),
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
      ($product) => idsProductsWithoutLinkToTask.includes($product.id),
    );

    return productsWithoutLinkToTask;
  }
}
