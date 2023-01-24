import { observer } from 'mobx-react-lite';
import { FC, useEffect, useMemo } from 'react';

import checkIcon from '../../../../assets/icons/check.svg';
import mapIcon from '../../../../assets/icons/map.svg';
import { useRootStore } from '../../../../utils/RootStoreProvider/useRootStore';
import ButtonIcon from '../../../blocks/buttonIcon/ButtonIcon';
import AssembledBlockFieldInput from '../../../blocks/form/assembled/BlockFieldInput';
import AssembledBlockFieldText from '../../../blocks/form/assembled/BlockFieldText';
import FormLayout from '../../../blocks/form/layout/Layout';
import Table from '../../../blocks/table/Table';
import WindowHeaderForm from '../../../blocks/windowHeader/form/Form';
import { useCheckIsSelect } from '../../../pages/hooks/useCheckIsSelect';

const PopupViewTask: FC = observer(() => {
  const { storePopup, storeProduct, storeState, storeTable, storeTask } =
    useRootStore();
  const checkIsSelectHook = useCheckIsSelect();

  const windowTitle = useMemo(() => {
    switch (storeState.interface.getCurrentTypeOfTask()) {
      case 'acceptance':
        return 'Задача распределения';
      case 'intra':
        return 'Внутрискладская задача';
      case 'shipment':
        return 'Задача отгрузки';
      default:
        return '';
    }
  }, [storeState.interface.getCurrentTypeOfTask()]);

  function closeHandler() {
    storePopup.status.hide('viewTask');
  }

  function viewLocationOpenHander() {
    const checkResult = checkIsSelectHook(
      'products',
      'products',
      'Выберите партию продуктов, чтобы увидеть информацию об их местоположении',
    );
    if (checkResult.result) {
      storePopup.view.product.setCurrentViewProduct(checkResult.itemId, () => {
        storePopup.status.show('viewLocation');
      });
    }
  }

  function markProductAsMoved() {
    const checkResult = checkIsSelectHook(
      'products',
      'products',
      'Выберите партию продуктов, чтобы отметить её перемещённой',
    );
    if (checkResult.result) {
      storeProduct.markAsMoved.markAsMoved(checkResult.itemId);
    }
  }

  useEffect(() => {
    if (storeProduct.status.get('markAsMoved') === 'done') {
      storeProduct.fetch.products();
      storeTask.fetch.oneTask(storeTask.state.task.taskInfo.id.value, () => {
        const { productIds } = storeTask.state.task;

        storePopup.select.products.setProductList(productIds);
      });
      storeProduct.status.set('markAsMoved', 'pending');
    }
  }, [storeProduct.status.get('markAsMoved')]);

  useEffect(() => {
    storeTable.selectedItem.setItemId('products', 'products', 0);
  }, []);

  useEffect(() => {
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
    <div className='popup popup__popup-view popup-view popup-view'>
      <WindowHeaderForm
        title={windowTitle}
        closeEventHandler={closeHandler}
      />

      <div className='popup-view__content-block'>
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
            fieldName='timeStart'
            titleText='Дата начала'
            readonlyInput
          />
          <AssembledBlockFieldInput
            typeForm='task'
            fieldName='timeEnd'
            titleText='Дата окончания'
            readonlyInput
          />
        </FormLayout>

        <div className='popup-view__table-block '>
          <div className='popup-view__button-block'>
            <ButtonIcon
              src={checkIcon}
              clickHandler={markProductAsMoved}
              alt='markAsMoved'
            />{' '}
            <ButtonIcon
              src={mapIcon}
              clickHandler={viewLocationOpenHander}
              alt='viewLocation'
            />
          </div>
          {storePopup.select.products.getProductListData().length > 0 ? (
            <Table
              data={storePopup.select.products.getProductListData()}
              keyWord='article'
              valuesType='products'
              selectingValues='products'
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

export default PopupViewTask;
