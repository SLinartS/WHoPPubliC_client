import './style.scss';
import '../../style.scss';

import { observer } from 'mobx-react-lite';
import { FC, useEffect, useState } from 'react';

import useGetProductListForTable from '../../../../hooks/mapAndPoint/useGetProductListForTable';
import { ITaskFormFields } from '../../../../store/form/task/field/type';
import { TChangeFieldEvent } from '../../../../types/form/type';
import { useRootStore } from '../../../../utils/RootStoreProvider/useRootStore';
import Button from '../../../blocks/button/Button';
import FormBlock from '../../../blocks/form/block/Block';
import FormField from '../../../blocks/form/field/Field';
import FormFieldInput from '../../../blocks/form/field/input/Input';
import FormFieldPoint from '../../../blocks/form/field/point/Point';
import FormLayout from '../../../blocks/form/layout/Layout';
import Table from '../../../blocks/table/Table';
import WindowHeader from '../../../blocks/windowHeader/WindowHeader';

const PopupFormTask: FC = observer(() => {
  const [isAcceptance, setIsAcceptance] = useState<boolean>(true);
  const { storePopup, storeProduct, storeForm, storeTask } = useRootStore();

  const getProductListForTable = useGetProductListForTable();

  function changeFieldHandler(
    e: TChangeFieldEvent,
    fieldName: keyof ITaskFormFields,
  ) {
    storeForm.task.field.setFormField(fieldName, e.target.value);
  }

  function closeHandler() {
    storePopup.hideTaskForm();
    storeForm.utils.resetForm();
    if (isAcceptance) {
      storeTask.status.set('fetchAcceptance', 'pending');
    } else {
      storeTask.status.set('fetchShipment', 'pending');
    }
  }

  function saveHandler() {
    if (!storeForm.error.isTaskErrors(isAcceptance)) {
      storeProduct.add.products(() => {
        storeTask.add.task(() => {
          storeForm.task.field.clearFormData();
          closeHandler();
        });
      });
    } else {
      storeForm.state.isDisplayDefaultErrors = true;
    }
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
    if (storeForm.state.currentTaskType === 'acceptance') {
      setIsAcceptance(true);
    } else {
      setIsAcceptance(false);
    }
  }, [storeForm.state.currentTaskType]);

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
            additionalTitleClasses='form-block__title--big'
          >
            <FormField errors={storeForm.task.field.getFormErrors('article')}>
              <FormFieldInput
                value={storeForm.task.field.getFormField('article')}
                changeHandler={(e) => changeFieldHandler(e, 'article')}
                additionalСlasses='form-block__input--big'
              />
            </FormField>
            <Button
              additionalСlasses='button--window-header'
              text='Сгенерировать'
            />
          </FormBlock>
        </FormLayout>

        <FormLayout additionalСlasses='form-block--title-info'>
          <FormBlock titleText='Дата начала'>
            <FormField errors={storeForm.task.field.getFormErrors('dateStart')}>
              <FormFieldInput
                value={storeForm.task.field.getFormField('dateStart')}
                changeHandler={(e) => changeFieldHandler(e, 'dateStart')}
              />
            </FormField>
          </FormBlock>
          <FormBlock titleText='Дата окончания'>
            <FormField errors={storeForm.task.field.getFormErrors('dateEnd')}>
              <FormFieldInput
                value={storeForm.task.field.getFormField('dateEnd')}
                changeHandler={(e) => changeFieldHandler(e, 'dateEnd')}
              />
            </FormField>
          </FormBlock>
        </FormLayout>

        <FormLayout>
          <FormBlock
            titleText={`Точки ${isAcceptance ? 'приёмки' : 'отгрузки'}`}
          >
            <FormField errors={storeForm.task.array.getFormErrors('points')}>
              <FormFieldPoint clickHandler={openSelectPointsHandler} />
            </FormField>
          </FormBlock>
          {isAcceptance ? (
            <FormBlock titleText='Точки склада'>
              <FormField
                errors={storeForm.task.array.getFormErrors('warehousePoints')}
              >
                <FormFieldPoint clickHandler={openSelectMapHandler} />
              </FormField>
            </FormBlock>
          ) : (
            ''
          )}
        </FormLayout>

        <div className='add-task__table-block'>
          <Button
            additionalСlasses='button--add-task'
            text='Добавить'
            clickHandler={openProductFormHandler}
          />

          {storeForm.product.list.list.length > 0 ? (
            <Table
              data={getProductListForTable().data}
              keyWord='article'
              tableHeader={getProductListForTable().tableHeader}
              valuesType='products'
              additionalСlasses='table--add-task'
            />
          ) : (
            <div className='add-task__absence-product'>
              Ни одна партия продукции не добавлена
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

export default PopupFormTask;
