import { observer } from 'mobx-react-lite';
import { FC, useEffect, useState } from 'react';

import { ITaskFormFields } from '../../../../store/popup/form/task/type';
import { TChangeFieldEvent } from '../../../../types/form/type';
import { useRootStore } from '../../../../utils/RootStoreProvider/useRootStore';
import Button from '../../../blocks/button/Button';
import FormBlock from '../../../blocks/form/block/Block';
import FormField from '../../../blocks/form/field/Field';
import FormFieldInput from '../../../blocks/form/field/input/Input';
import FormFieldPoint from '../../../blocks/form/field/point/Point';
import FormLayout from '../../../blocks/form/layout/Layout';
import Table from '../../../blocks/table/Table';
import WindowHeaderForm from '../../../blocks/windowHeader/form/Form';

const PopupFormTask: FC = observer(() => {
  const [isAcceptance, setIsAcceptance] = useState<boolean>(true);
  const { storePopup, storeTask } = useRootStore();

  function changeFieldHandler(
    e: TChangeFieldEvent,
    fieldName: keyof ITaskFormFields,
  ) {
    storePopup.form.task.setFormField(fieldName, e.target.value);
  }

  function closeHandler() {
    storePopup.status.hideTaskForm();
    storePopup.form.utils.utils.resetForm();
    if (isAcceptance) {
      storeTask.status.set('fetchAcceptance', 'pending');
    } else {
      storeTask.status.set('fetchShipment', 'pending');
    }
  }

  function saveHandler() {
    if (!storePopup.form.utils.error.isTaskErrors(isAcceptance)) {
      storeTask.add.task(() => {
        storePopup.form.task.clearFormData();
        closeHandler();
      });
    } else {
      storePopup.form.state.isDisplayDefaultErrors = true;
    }
  }

  function openSelectMapHandler() {
    storePopup.status.showSelectMap();
    storePopup.status.hideTaskForm();
  }

  function openSelectProductHandler() {
    storePopup.status.showSelectProducts();
    storePopup.status.hideTaskForm();
  }

  useEffect(() => {
    if (storePopup.form.state.currentTaskType === 'acceptance') {
      setIsAcceptance(true);
    } else {
      setIsAcceptance(false);
    }
  }, [storePopup.form.state.currentTaskType]);

  return (
    <div className='popup popup--form popup--form-add-task'>
      <WindowHeaderForm
        title={`Добавить задачу ${isAcceptance ? 'приёмки' : 'отгрузки'}`}
        saveEvent={saveHandler}
        closeEvent={closeHandler}
      />

      <div className='popup--form-add-task__content-block'>
        <FormLayout classes='form-block--article-info'>
          <FormBlock
            titleText='Название'
            additionalTitleClasses='form-block__title--big'
          >
            <FormField errors={storePopup.form.task.getFormErrors('article')}>
              <FormFieldInput
                value={storePopup.form.task.getFormField('article')}
                changeHandler={(e) => changeFieldHandler(e, 'article')}
                classes='form-block__input--big'
              />
            </FormField>
            <Button
              classes='button--window-header'
              text='Сгенерировать'
            />
          </FormBlock>
        </FormLayout>

        <FormLayout classes='form-block--title-info'>
          <FormBlock titleText='Дата начала'>
            <FormField errors={storePopup.form.task.getFormErrors('dateStart')}>
              <FormFieldInput
                value={storePopup.form.task.getFormField('dateStart')}
                changeHandler={(e) => changeFieldHandler(e, 'dateStart')}
              />
            </FormField>
          </FormBlock>
          <FormBlock titleText='Дата окончания'>
            <FormField errors={storePopup.form.task.getFormErrors('dateEnd')}>
              <FormFieldInput
                value={storePopup.form.task.getFormField('dateEnd')}
                changeHandler={(e) => changeFieldHandler(e, 'dateEnd')}
              />
            </FormField>
          </FormBlock>
        </FormLayout>

        <FormLayout>
          {isAcceptance ? (
            <FormBlock titleText='Точки склада'>
              <FormField errors={storePopup.select.warehousePoints.arrayErrors}>
                <FormFieldPoint clickHandler={openSelectMapHandler} />
              </FormField>
            </FormBlock>
          ) : (
            ''
          )}
        </FormLayout>

        <div className='popup--form-add-task__table-block'>
          <div className='popup--form-add-task__button-block'>
            <Button
              classes='button--add-task'
              text='Выбрать'
              clickHandler={openSelectProductHandler}
            />
            <Button
              classes='button--add-task'
              text='Убрать'
              clickHandler={openSelectProductHandler}
            />
          </div>

          {storePopup.select.products.getProductListData().length > 0 ? (
            <Table
              data={
                storePopup.form.utils.utils.getFilteredProducts(
                  storePopup.select.products.getProductListData(),
                  [],
                  [],
                ).filteredProducts
              }
              keyWord='article'
              tableHeader={
                storePopup.form.utils.utils.getFilteredProducts(
                  storePopup.select.products.getProductListData(),
                  [],
                  [],
                ).filteredProductHeader
              }
              valuesType='products'
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

export default PopupFormTask;
