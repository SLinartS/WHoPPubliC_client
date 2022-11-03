import './style.scss';
import '../../style.scss';

import { observer } from 'mobx-react-lite';
import { FC, useEffect, useState } from 'react';

import useGetProductListForTable from '../../../../hooks/mapAndPoint/useGetProductListForTable/useGetProductListForTable';
import { ITaskFormDataFields } from '../../../../store/form/task/type';
import { TChangeFieldEvent } from '../../../../types/form/type';
import { useRootStore } from '../../../../utils/RootStoreProvider/useRootStore';
import Button from '../../../blocks/button/Button';
import FormBlock from '../../../blocks/form/block/Block';
import FormFieldInput from '../../../blocks/form/field/input/Input';
import FormFieldPoint from '../../../blocks/form/field/point/point';
import FormLayout from '../../../blocks/form/layout/Layout';
import Table from '../../../blocks/table/Table';
import WindowHeader from '../../../blocks/windowHeader/WindowHeader';

const PopupFormTask: FC = observer(() => {
  const [isAcceptance, setIsAcceptance] = useState<boolean>(true);
  const {
    storePopup,
    storeProduct,
    storeFormTask,
    storeTasks,
    storePoint,
    storeFormProduct,
    storeCategory,
  } = useRootStore();

  const getProductListForTable = useGetProductListForTable();

  function changeFieldHandler(
    e: TChangeFieldEvent,
    fieldName: keyof ITaskFormDataFields,
  ) {
    storeFormTask[fieldName] = e.target.value;
  }

  function closeHandler() {
    storePopup.hideTaskForm();
    storeFormTask.clearPoints();
    storeFormTask.clearWarehousePoints();
    storeFormTask.clearProducts();
    storePoint.statusFetchPoints = 'pending';
    storeProduct.statusFetchProducts = 'pending';
    storeCategory.statusFetchCategories = 'pending';
    storeFormProduct.clearProductList();
  }

  function saveHandler() {
    storeProduct.addProducts();
    closeHandler();
  }

  function openSelectPointsHandler() {
    storePopup.showSelectPoints();
    storePopup.hideTaskForm();
  }

  function openSelectMapHandler() {
    storePopup.showSelectMap();
    storePopup.hideTaskForm();
  }

  function openProductFormHandler() {
    storePopup.showProductForm();
    storePopup.hideTaskForm();
  }

  useEffect(() => {
    if (storeFormTask.currentTaskType === 'acceptance') {
      setIsAcceptance(true);
    } else {
      setIsAcceptance(false);
    }

    if (storeProduct.statusAddProducts === 'done') {
      storeTasks.addTask();
    }

    if (storeTasks.statusAddTask === 'done') {
      storePopup.hideTaskForm();
      storeFormProduct.clearProductList();
    }
  }, [
    storeFormTask.currentTaskType,
    storeProduct.statusAddProducts,
    storeTasks.statusAddTask,
    storeFormProduct,
    storePopup,
    storeTasks,
  ]);

  return (
    <div className='popup add-task'>
      <WindowHeader
        text={`Добавить задачу ${isAcceptance ? 'приёмки' : 'отгрузки'}`}
        saveEvent={saveHandler}
        closeEvent={closeHandler}
      />

      <div className='add-task__content-block'>
        <FormLayout additionalСlasses='form-block--article-info'>
          <FormBlock
            titleText='Название'
            additionalTitleBlockClasses='form-block__title--big'
          >
            <FormFieldInput
              value={storeFormTask.article}
              changeEvent={(e) => changeFieldHandler(e, 'article')}
              additionalСlasses='form-block__input--big'
            />
            <Button
              additionalСlasses='button--window-header'
              text='Сгенерировать'
            />
          </FormBlock>
        </FormLayout>

        <FormLayout additionalСlasses='form-block--title-info'>
          <FormBlock titleText='Дата начала'>
            <FormFieldInput
              value={storeFormTask.dateStart}
              changeEvent={(e) => changeFieldHandler(e, 'dateStart')}
            />
          </FormBlock>
          <FormBlock titleText='Дата окончания'>
            <FormFieldInput
              value={storeFormTask.dateEnd}
              changeEvent={(e) => changeFieldHandler(e, 'dateEnd')}
            />
          </FormBlock>
        </FormLayout>

        <FormLayout>
          <FormBlock
            titleText={`Точки ${isAcceptance ? 'приёмки' : 'отгрузки'}`}
          >
            <FormFieldPoint clickEvent={openSelectPointsHandler} />
          </FormBlock>
          {isAcceptance ? (
            <FormBlock titleText='Точки склада'>
              <FormFieldPoint clickEvent={openSelectMapHandler} />
            </FormBlock>
          ) : (
            ''
          )}
        </FormLayout>

        <div className='add-task__table-block'>
          <Button
            additionalСlasses='button--add-task'
            text='Добавить'
            clickEvent={openProductFormHandler}
          />

          {storeFormProduct.productList.length > 0 ? (
            <Table
              data={getProductListForTable().data}
              tableHeader={getProductListForTable().tableHeader}
              additionalСlasses='table--add-task'
            />
          ) : (
            ''
          )}
        </div>
      </div>
    </div>
  );
});

export default PopupFormTask;
