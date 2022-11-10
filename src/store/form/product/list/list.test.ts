import RootStore from '../../../root';

describe('FormProductListStore', () => {
  const root = RootStore.getInstance();

  beforeAll(() => {
    root.storeFormProductField.setFormField('article', 'Article1');
    root.storeFormProductField.setFormField('title', 'Title1');
    root.storeFormProductField.setFormField('author', 'Author1');
    root.storeFormProductField.setFormField('number', '1000');
    root.storeFormProductField.setFormField('categoryId', '1');
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
    root.storeFormProductField.setFormField('article', 'Article2');
    root.storeFormProductField.setFormField('title', 'Title2');
    root.storeFormProductField.setFormField('author', 'Author2');
    root.storeFormProductField.setFormField('number', '500');
    root.storeFormProductField.setFormField('categoryId', '2');
    root.storeFormProductField.setFormField('printDate', '2022-01-12');
    root.storeFormProductField.setFormField('printingHouse', 'PrintingHouse2');
    root.storeFormProductField.setFormField('yearOfPublication', '2022');
    root.storeFormProductField.setFormField(
      'publishingHouse',
      'PublishingHouse2',
    );
    root.storeFormProductField.setFormField(
      'publishingHouse',
      'PublishingHouse2',
    );
    root.storeFormProductList.addProductToList();
    const { list } = root.storeFormProductList;
    console.log(list);
    expect(list[0]).not.toEqual(list[1]);
  });
});
