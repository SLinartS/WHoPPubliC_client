import { AxiosResponse } from 'axios';
import { makeAutoObservable } from 'mobx';

import extendAxios from '../../../../utils/extendAxios';
import { IProduct } from '../../../product/type';
import RootStore from '../../../root';
import { ICheckArticleResponse } from './type';

export class StorePopupFormUtils {
  constructor(private readonly root: RootStore) {
    makeAutoObservable(this, {});
  }

  public getTaskTypeId(): number {
    switch (this.root.storeState.interface.getCurrentTypeOfTask()) {
      case 'acceptance':
        return 1;
      case 'intra':
        return 3;
      case 'shipment':
        return 2;
      default:
        return 1;
    }
  }

  public async generateArticle(type: 'task' | 'product'): Promise<string> {
    let result = '';
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < 4; i += 1) {
      result += characters[Math.floor(Math.random() * charactersLength)];
    }
    try {
      const response: AxiosResponse<ICheckArticleResponse> =
        await extendAxios.get<ICheckArticleResponse>(
          `check-article/${type}/${result}`,
        );
      if (response.data.isActionExist) {
        return await this.generateArticle(type);
      }
      return result;
    } catch (error) {
      return '< error generating the article >';
    }
  }

  public resetForm(): void {
    this.root.storePopup.select.points.clear();
    this.root.storePopup.select.floors.clear();
    this.root.storePopup.select.floors.clear();
    this.root.storePopup.select.products.clear();
    this.root.storePopup.form.task.clearFormData();
    this.root.storeProduct.status.set('add', 'pending');
    this.root.storeProduct.status.set('fetch', 'pending');
    this.root.storePoint.status.set('fetch', 'pending');
    this.root.storeCategory.status.set('fetch', 'pending');
    this.root.storeTask.status.set('add', 'pending');
    this.root.storePopup.form.state.isDisplayDefaultErrors = false;
  }

  public getProductWithoutLinkToFloor() {
    const products = this.getUnselectedProducts();
    const productIdsWithoutLinks =
      this.root.storeProduct.state.products.serviceInformation
        .filter((product) => !product.isLinkedToFloors)
        .map((product) => product.productId);
    const productsWithoutLinks = products.filter((product) =>
      productIdsWithoutLinks.includes(product.id.value),
    );
    return productsWithoutLinks;
  }

  public getActualProductWithLinkToFloor() {
    const products = this.getUnselectedProducts();
    const productIdsWithoutLinks =
      this.root.storeProduct.state.products.serviceInformation
        .filter(
          (product) =>
            product.isLinkedToFloors && product.actualFloorIds.length > 0,
        )
        .map((product) => product.productId);
    const productsWithoutLinks = products.filter((product) =>
      productIdsWithoutLinks.includes(product.id.value),
    );
    return productsWithoutLinks;
  }

  public getUnselectedProducts() {
    const unselectedProducts: IProduct[] =
      this.root.storeProduct.state.products.data.filter(
        (product) =>
          !this.root.storePopup.select.products.values.includes(
            product.id.value,
          ),
      );
    return this.getProductsWithoutLinkToTask(unselectedProducts);
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
