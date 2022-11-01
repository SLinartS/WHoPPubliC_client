import { observer } from 'mobx-react-lite';
import { FC, useEffect, useState } from 'react';
import {
  IAddTaskFormDataFields,
  TChangeFieldEvent,
} from '../../../store/form/addTaskForm/type';

import { useRootStore } from '../../../utils/RootStoreProvider/useRootStore';
import Button from '../../blocks/button/Button';
import FormBlock from '../../blocks/form/block/Block';
import FormFieldInput from '../../blocks/form/field/input/Input';
import FormFieldPoint from '../../blocks/form/field/point/point';
import FormLayout from '../../blocks/form/layout/Layout';
import Table from '../../blocks/table/Table';
import WindowHeader from '../../blocks/windowHeader/WindowHeader';
import './style.scss';

const AddTask: FC = observer(() => {
  const [isAcceptance, setIsAcceptance] = useState<boolean>(true);
  const {
    popupStore,
    productsStore,
    addTaskFormStore,
    tasksStore,
    addProductFormStore,
  } = useRootStore();

  function changeFieldHandler(
    e: TChangeFieldEvent,
    fieldName: keyof IAddTaskFormDataFields,
  ) {
    addTaskFormStore[fieldName] = e.target.value;
  }

  function addPointHandler() {
    popupStore.showSelectPoints();
    popupStore.hideAddTaskWindow();
  }

  function addWarehousePointHandler() {
    popupStore.showSelectMap();
    popupStore.hideAddTaskWindow();
  }

  function hideAddAcceptanceTaskWindowHandler() {
    popupStore.hideAddTaskWindow();
  }

  function showAddProductWindowHandler() {
    popupStore.showAddProductWindow();
    popupStore.hideAddTaskWindow();
  }

  useEffect(() => {
    if (addTaskFormStore.currentTaskType === 'acceptance') {
      setIsAcceptance(true);
    } else {
      setIsAcceptance(false);
    }
  }, [
    popupStore,
    productsStore,
    tasksStore,
    addTaskFormStore.title,
    tasksStore.statusAddTask,
    addTaskFormStore.currentTaskType,
  ]);

  const PRODUCT_TABLE_HEADER = [
    'Артикул',
    'Название',
    'Автор',
    'Категория',
    'Количество',
    'Типография',
    'Издательство',
  ];

  return (
    <div className='add-task'>
      <WindowHeader
        text={`Добавить задачу ${isAcceptance ? 'приёмки' : 'отгрузки'}`}
      >
        <Button
          additionalСlasses='button--window-header'
          text='Сохранить'
          onClick={hideAddAcceptanceTaskWindowHandler}
        />
        <Button
          additionalСlasses='button--window-header'
          text='Отмена'
          onClick={hideAddAcceptanceTaskWindowHandler}
        />
      </WindowHeader>

      <div className='add-task__content-block'>
        <FormLayout additionalСlasses='properties-block--article-info'>
          <FormBlock
            titleText='Название'
            additionalTitleBlockClasses='properties-block__title--big'
          >
            <FormFieldInput
              value={addTaskFormStore.title}
              changeEvent={(e) => changeFieldHandler(e, 'title')}
              additionalСlasses='properties-block__input--big'
            />
            <Button
              additionalСlasses='button--window-header'
              text='Сгенерировать'
            />
          </FormBlock>
        </FormLayout>

        <FormLayout additionalСlasses='properties-block--title-info'>
          <FormBlock titleText='Дата начала'>
            <FormFieldInput
              value={addTaskFormStore.dateStart}
              changeEvent={(e) => changeFieldHandler(e, 'dateStart')}
            />
          </FormBlock>
          <FormBlock titleText='Дата окончания'>
            <FormFieldInput
              value={addTaskFormStore.dateEnd}
              changeEvent={(e) => changeFieldHandler(e, 'dateEnd')}
            />
          </FormBlock>
        </FormLayout>

        <FormLayout>
          <FormBlock
            titleText={`Точки ${isAcceptance ? 'приёмки' : 'отгрузки'}`}
          >
            <FormFieldPoint clickEvent={addPointHandler} />
          </FormBlock>
          {isAcceptance ? (
            <FormBlock titleText='Точки склада'>
              <FormFieldPoint clickEvent={addWarehousePointHandler} />
            </FormBlock>
          ) : (
            ''
          )}
        </FormLayout>

        <div className='add-task__table-block'>
          <Button
            additionalСlasses='button--add-task'
            text='Добавить'
            onClick={showAddProductWindowHandler}
          />

          {addProductFormStore.addedProductList.length > 0 ? (
            <Table
              data={addProductFormStore.getAddedProductListForTable()}
              tableHeader={PRODUCT_TABLE_HEADER}
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

export default AddTask;
