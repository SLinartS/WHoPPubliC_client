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
  const {
    storePopup,
    storeProduct,
    storeFormUtils,
    storeFormState,
    storeFormProductList,
    storeFormTaskArray,
    storeFormTaskField,
    storeTasks,
  } = useRootStore();

  const getProductListForTable = useGetProductListForTable();

  function changeFieldHandler(
    e: TChangeFieldEvent,
    fieldName: keyof ITaskFormFields,
  ) {
    storeFormTaskField.setFormField(fieldName, e.target.value);
  }

  function closeHandler() {
    storePopup.hideTaskForm();
    storeFormUtils.resetTaskForm();
    if (isAcceptance) {
      storeTasks.statusFetchAcceptanceTasks = 'pending';
    } else {
      storeTasks.statusFetchShipmentTasks = 'pending';
    }
  }

  function saveHandler() {
    if (!storeFormUtils.checkTaskErrors(isAcceptance)) {
      storeProduct.addProducts(() => {
        storeTasks.addTask(() => {
          storeFormTaskField.clearFormData();
          closeHandler();
        });
      });
    } else {
      storeFormState.isDisplayDefaultErrors = true;
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
    if (storeFormState.currentTaskType === 'acceptance') {
      setIsAcceptance(true);
    } else {
      setIsAcceptance(false);
    }
  }, [storeFormState.currentTaskType]);

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
            <FormField errors={storeFormTaskField.getFormErrors('article')}>
              <FormFieldInput
                value={storeFormTaskField.getFormField('article')}
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
            <FormField errors={storeFormTaskField.getFormErrors('dateStart')}>
              <FormFieldInput
                value={storeFormTaskField.getFormField('dateStart')}
                changeHandler={(e) => changeFieldHandler(e, 'dateStart')}
              />
            </FormField>
          </FormBlock>
          <FormBlock titleText='Дата окончания'>
            <FormField errors={storeFormTaskField.getFormErrors('dateEnd')}>
              <FormFieldInput
                value={storeFormTaskField.getFormField('dateEnd')}
                changeHandler={(e) => changeFieldHandler(e, 'dateEnd')}
              />
            </FormField>
          </FormBlock>
        </FormLayout>

        <FormLayout>
          <FormBlock
            titleText={`Точки ${isAcceptance ? 'приёмки' : 'отгрузки'}`}
          >
            <FormField errors={storeFormTaskArray.getFormErrors('points')}>
              <FormFieldPoint clickHandler={openSelectPointsHandler} />
            </FormField>
          </FormBlock>
          {isAcceptance ? (
            <FormBlock titleText='Точки склада'>
              <FormField
                errors={storeFormTaskArray.getFormErrors('warehousePoints')}
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
            clickEvent={openProductFormHandler}
          />

          {storeFormProductList.list.length > 0 ? (
            <Table
              data={getProductListForTable().data}
              keyWord='article'
              tableHeader={getProductListForTable().tableHeader}
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
