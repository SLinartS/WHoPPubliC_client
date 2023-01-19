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
