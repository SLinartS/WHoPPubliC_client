import RootStore from '../../../root';

describe('FormProductListStore', () => {
  const root = RootStore.getInstance();

  beforeAll(() => {
    root.storeForm.product.field.setFormField('article', 'Article1');
    root.storeForm.product.field.setFormField('title', 'Title1');
    root.storeForm.product.field.setFormField('author', 'Author1');
    root.storeForm.product.field.setFormField('number', '1000');
    root.storeForm.product.field.setFormField('categoryId', '1');
    root.storeForm.product.field.setFormField('printDate', '2022-01-11');
    root.storeForm.product.field.setFormField(
      'printingHouse',
      'PrintingHouse1',
    );
    root.storeForm.product.field.setFormField('yearOfPublication', '2021');
    root.storeForm.product.field.setFormField(
      'publishingHouse',
      'PublishingHouse1',
    );
    root.storeForm.product.field.setFormField(
      'publishingHouse',
      'PublishingHouse1',
    );
  });

  test('List objects differ by reference', () => {
    root.storeForm.product.list.addProductToList();
    root.storeForm.product.field.setFormField('article', 'Article2');
    root.storeForm.product.field.setFormField('title', 'Title2');
    root.storeForm.product.field.setFormField('author', 'Author2');
    root.storeForm.product.field.setFormField('number', '500');
    root.storeForm.product.field.setFormField('categoryId', '2');
    root.storeForm.product.field.setFormField('printDate', '2022-01-12');
    root.storeForm.product.field.setFormField(
      'printingHouse',
      'PrintingHouse2',
    );
    root.storeForm.product.field.setFormField('yearOfPublication', '2022');
    root.storeForm.product.field.setFormField(
      'publishingHouse',
      'PublishingHouse2',
    );
    root.storeForm.product.field.setFormField(
      'publishingHouse',
      'PublishingHouse2',
    );
    root.storeForm.product.list.addProductToList();
    const { list } = root.storeForm.product.list;
    console.log(list);
    expect(list[0]).not.toEqual(list[1]);
  });
});
