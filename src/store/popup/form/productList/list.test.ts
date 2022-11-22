import RootStore from '../../../root';

describe('FormProductListStore', () => {
  const root = RootStore.getInstance();

  beforeAll(() => {
    root.storePopup.form.product.setFormField('article', 'Article1');
    root.storePopup.form.product.setFormField('title', 'Title1');
    root.storePopup.form.product.setFormField('author', 'Author1');
    root.storePopup.form.product.setFormField('number', '1000');
    root.storePopup.form.product.setFormField('categoryId', '1');
    root.storePopup.form.product.setFormField('printDate', '2022-01-11');
    root.storePopup.form.product.setFormField(
      'printingHouse',
      'PrintingHouse1',
    );
    root.storePopup.form.product.setFormField('yearOfPublication', '2021');
    root.storePopup.form.product.setFormField(
      'publishingHouse',
      'PublishingHouse1',
    );
    root.storePopup.form.product.setFormField(
      'publishingHouse',
      'PublishingHouse1',
    );
  });

  test('List objects differ by reference', () => {
    root.storePopup.form.productList.addProductToList();
    root.storePopup.form.product.setFormField('article', 'Article2');
    root.storePopup.form.product.setFormField('title', 'Title2');
    root.storePopup.form.product.setFormField('author', 'Author2');
    root.storePopup.form.product.setFormField('number', '500');
    root.storePopup.form.product.setFormField('categoryId', '2');
    root.storePopup.form.product.setFormField('printDate', '2022-01-12');
    root.storePopup.form.product.setFormField(
      'printingHouse',
      'PrintingHouse2',
    );
    root.storePopup.form.product.setFormField('yearOfPublication', '2022');
    root.storePopup.form.product.setFormField(
      'publishingHouse',
      'PublishingHouse2',
    );
    root.storePopup.form.product.setFormField(
      'publishingHouse',
      'PublishingHouse2',
    );
    root.storePopup.form.productList.addProductToList();
    const { list } = root.storePopup.form.productList;
    expect(list[0]).not.toEqual(list[1]);
  });
});
