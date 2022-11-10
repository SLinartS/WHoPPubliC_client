import RootStore from '../../../root';

describe('FormProductListStore', () => {
  const root = RootStore.getInstance();

  beforeAll(() => {
    root.storeFormProductField.setFormField('article', 'Article1');
    root.storeFormProductField.setFormField('title', 'Title1');
    root.storeFormProductField.setFormField('author', 'Author1');
    root.storeFormProductField.setFormField('number', '1000');
    root.storeFormProductField.setFormField('printDate', '2022-01-11');
    root.storeFormProductField.setFormField('printingHouse', 'PrintingHouse1');
    root.storeFormProductField.setFormField('yearOfPublication', '2021');
    root.storeFormProductField.setFormField(
      'publishingHouse',
      'PublishingHouse1',
    );
    root.storeFormProductField.setFormField(
      'publishingHouse',
      'PublishingHouse1',
    );
  });

  test('List objects differ by reference', () => {
    root.storeFormProductList.addProductToList();
    root.storeFormProductList.addProductToList();

    const { list } = root.storeFormProductList;
    expect(list[0]).not.toBe(list[1]);
  });
});
