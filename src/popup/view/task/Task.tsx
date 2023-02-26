import '../style.scss';
import '../../style.scss';

import checkIcon from '@assets/icons/check.svg';
import mapIcon from '@assets/icons/map.svg';
import ButtonIcon from '@components/buttonIcon/ButtonIcon';
import AssembledBlockFieldDatetime from '@components/form/assembled/BlockFieldDatetime';
import AssembledBlockFieldText from '@components/form/assembled/BlockFieldText';
import FormLayout from '@components/form/layout/Layout';
import Table from '@components/table/Table';
import WindowHeaderForm from '@components/windowHeader/form/Form';
import { useRootStore } from '@helpers/RootStoreProvider/useRootStore';
import { useFetchOneProductAndFillForm } from '@hooks/product/useFetchOneProductAndFillForm';
import { useCheckIsSelect } from '@hooks/useCheckIsSelect';
import { observer } from 'mobx-react-lite';
import { FC, useEffect, useMemo } from 'react';
import { useResetForm } from 'src/popup/hooks/resetForm/useResetForm';

const PopupViewTask: FC = () => {
  const { storePopup, storeProduct, storeState, storeTable, storeTask } =
    useRootStore();
  const checkIsSelect = useCheckIsSelect();
  const fetchOneProductAndFillForm = useFetchOneProductAndFillForm();
  const resetForm = useResetForm();

  const windowTitle = useMemo(() => {
    switch (storeState.interface.currentTypeOfTask) {
      case 'acceptance':
        return 'Задача распределения';
      case 'intra':
        return 'Внутрискладская задача';
      case 'shipment':
        return 'Задача отгрузки';
      default:
        return '';
    }
  }, [storeState.interface.currentTypeOfTask]);

  function closeHandler() {
    storePopup.status.hide('viewTask');
    resetForm();
  }

  function changeFieldHandlerPlug() {}

  function viewLocationOpenHandler() {
    const checkResult = checkIsSelect(
      'products',
      'products',
      'Выберите партию продуктов, чтобы увидеть информацию об их местоположении',
    );
    if (checkResult.result) {
      fetchOneProductAndFillForm(
        'viewLocation',
        'Выберите партию продуктов, чтобы увидеть информацию об их местоположении',
        true,
      );
    }
  }

  function markProductAsMoved() {
    const checkResult = checkIsSelect(
      'products',
      'products',
      'Выберите партию продуктов, чтобы отметить её перемещённой',
    );
    if (checkResult.result) {
      storeProduct.action.markAsMoved(checkResult.itemId);
    }
  }

  useEffect(() => {
    if (storeProduct.status.get('markAsMoved') === 'done') {
      storeProduct.action.fetch('');
      storeTask.action.show(storeTask.state.task.taskInfo.id.value, () => {
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
      storeProduct.action.fetch('', () => {
        storeTable.utils.setDefaultMark(
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
  }, [storeState.interface.currentTypeOfTask]);

  return (
    <>
      <WindowHeaderForm
        title={windowTitle}
        closeEventHandler={closeHandler}
      />

      <div className='popup-view__content-block popup-view__content-block--view-task'>
        <FormLayout classes='article-info-view-task'>
          <AssembledBlockFieldText
            value={storePopup.form.task.getFormField('article')}
            errors={storePopup.form.task.getFormErrors('article')}
            typeForm='task'
            fieldName='article'
            titleText='Артикул'
          />
        </FormLayout>

        <FormLayout classes='time-info-view-task'>
          <AssembledBlockFieldDatetime
            valueDate={storePopup.form.task.getFormField('dateStart')}
            valueTime={storePopup.form.task.getFormField('timeStart')}
            errorsDate={[]}
            errorsTime={[]}
            changeDateHandler={changeFieldHandlerPlug}
            changeTimeHandler={changeFieldHandlerPlug}
            typeForm='task'
            fieldNameDate='dateStart'
            fieldNameTime='timeStart'
            titleText='Дата начала'
            readonly
          />
          <AssembledBlockFieldDatetime
            valueDate={storePopup.form.task.getFormField('dateEnd')}
            valueTime={storePopup.form.task.getFormField('timeEnd')}
            errorsDate={[]}
            errorsTime={[]}
            changeDateHandler={changeFieldHandlerPlug}
            changeTimeHandler={changeFieldHandlerPlug}
            typeForm='task'
            fieldNameDate='dateEnd'
            fieldNameTime='timeEnd'
            titleText='Дата окончания'
            readonly
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
              clickHandler={viewLocationOpenHandler}
              alt='viewLocation'
            />
          </div>
          {storePopup.select.products.getProductListData().length > 0 ? (
            <Table
              data={storePopup.select.products.getProductListData()}
              valuesType='products'
              selectingValues='products'
              displayedColumns={storeTable.utils.getColumnsWithMark('products')}
              classes='table--view-task'
            />
          ) : (
            <div className='popup--form-add-task__absence-product'>
              Ни одна партия продукции не добавлена
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default observer(PopupViewTask);
