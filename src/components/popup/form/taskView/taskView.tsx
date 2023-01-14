import { observer } from 'mobx-react-lite';
import { FC, useEffect, useState } from 'react';

import checkIcon from '../../../../assets/icons/check.svg';
import mapIcon from '../../../../assets/icons/map.svg';
import { useRootStore } from '../../../../utils/RootStoreProvider/useRootStore';
import AssembledBlockFieldInput from '../../../blocks/form/assembled/BlockFieldInput';
import AssembledBlockFieldText from '../../../blocks/form/assembled/BlockFieldText';
import FormLayout from '../../../blocks/form/layout/Layout';
import Table from '../../../blocks/table/Table';
import WindowHeaderForm from '../../../blocks/windowHeader/form/Form';

const PopupFormTaskView: FC = observer(() => {
  const [isAcceptance, setIsAcceptance] = useState<boolean>(true);
  const { storePopup, storeProduct, storeState, storeTable } = useRootStore();

  function closeHandler() {
    storePopup.status.hideTaskFormView();
  }

  function mapOpenHander() {}

  function markProductAsMoved() {}

  useEffect(() => {
    if (storeState.interface.getCurrentTypeOfTask() === 'acceptance') {
      setIsAcceptance(true);
    } else {
      setIsAcceptance(false);
    }

    if (storeProduct.status.get('fetch') === 'pending') {
      storeProduct.fetch.products(() => {
        storeTable.utils.setDefaulMark(
          'products',
          storeProduct.state.products.data,
          [
            'categoryId',
            'printingHouse',
            'yearOfPublication',
            'publishingHouse',
          ],
        );
      });
    }
  }, [storeState.interface.getCurrentTypeOfTask()]);

  return (
    <div className='popup popup__popup-form popup-form popup-form--view-task'>
      <WindowHeaderForm
        title={`Задача ${isAcceptance ? 'приёмки' : 'отгрузки'}`}
        closeEventHandler={closeHandler}
      />

      <div className='popup-form__content-block popup-form__content-block--view-task'>
        <FormLayout classes='article-info'>
          <AssembledBlockFieldText
            typeForm='task'
            fieldName='article'
            titleText='Артикул'
          />
        </FormLayout>

        <FormLayout classes='time-info'>
          <AssembledBlockFieldInput
            typeForm='task'
            fieldName='dateStart'
            titleText='Дата начала'
            readonlyInput
          />
          <AssembledBlockFieldInput
            typeForm='task'
            fieldName='dateEnd'
            titleText='Дата окончания'
            readonlyInput
          />
        </FormLayout>

        <div className='popup-form__table-block popup-form__table-block--view-task'>
          <div className='popup-form__button-block popup-form__button-block--view-task'>
            <img
              className='popup-form__icon-button'
              src={checkIcon}
              alt='add'
              onClick={markProductAsMoved}
            />
            <img
              className='popup-form__icon-button'
              src={mapIcon}
              alt='add'
              onClick={mapOpenHander}
            />
          </div>
          {storePopup.select.products.getProductListData().length > 0 ? (
            <Table
              data={storePopup.form.utils.utils.getFilteredProducts(
                storePopup.select.products.getProductListData(),
              )}
              keyWord='article'
              valuesType='products'
              displayedColumns={storeTable.utils.getColumnsWithMark('products')}
              classes='table--add-task'
            />
          ) : (
            <div className='popup--form-add-task__absence-product'>
              Ни одна партия продукции не добавлена
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

export default PopupFormTaskView;
