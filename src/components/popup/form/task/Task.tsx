import { observer } from 'mobx-react-lite';
import { FC, useEffect, useState } from 'react';

import { useRootStore } from '../../../../utils/RootStoreProvider/useRootStore';
import Button from '../../../blocks/button/Button';
import AssembledBlockFieldInput from '../../../blocks/form/assembled/BlockFieldInput';
import AssembledBlockFieldText from '../../../blocks/form/assembled/BlockFieldText';
import FormBlock from '../../../blocks/form/block/Block';
import FormBlockTitle from '../../../blocks/form/block/title/Title';
import FormField from '../../../blocks/form/field/Field';
import FormFieldPoint from '../../../blocks/form/field/point/Point';
import FormLayout from '../../../blocks/form/layout/Layout';
import Table from '../../../blocks/table/Table';
import WindowHeaderForm from '../../../blocks/windowHeader/form/Form';

const PopupFormTask: FC = observer(() => {
  const [isAcceptance, setIsAcceptance] = useState<boolean>(true);
  const { storePopup, storeTask, storeProduct, storeState, storeTable } =
    useRootStore();

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
    const { formActionType } = storePopup.form.state;

    if (formActionType === 'create') {
      storePopup.form.task.setFormField('id', '0');
    }

    if (!storePopup.form.utils.error.isTaskErrors(isAcceptance)) {
      switch (formActionType) {
        case 'create':
          storeTask.add.task(() => {
            storePopup.form.task.clearFormData();
            closeHandler();
          });
          break;
        case 'change':
          storeTask.update.task(() => {
            storePopup.form.task.clearFormData();
            closeHandler();
          });
          break;
        default:
      }
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

  function removeProductFromList() {
    storePopup.select.products.removeProductFromList();
  }

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
    <div className='popup popup__popup-form popup-form  popup-form--add-task'>
      <WindowHeaderForm
        title={`Добавить задачу ${isAcceptance ? 'приёмки' : 'отгрузки'}`}
        backEventHandler={closeHandler}
        saveEventHandler={saveHandler}
        closeEventHandler={closeHandler}
      />

      <div className='popup-form__content-block popup-form__content-block--add-task'>
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
            readonlyInput={false}
          />
          <AssembledBlockFieldInput
            typeForm='task'
            fieldName='dateEnd'
            titleText='Дата окончания'
            readonlyInput={false}
          />
        </FormLayout>

        <FormLayout classes='points'>
          {isAcceptance ? (
            <FormBlock
              titleText=''
              classes='task-points'
            >
              <FormField
                typeForm='custom'
                customErrors={storePopup.select.floors.arrayErrors}
                classes='task-points'
              >
                <FormFieldPoint clickHandler={openSelectMapHandler} />
              </FormField>
              <FormBlockTitle
                text='Точки'
                classes='task-points'
              />
            </FormBlock>
          ) : (
            ''
          )}
        </FormLayout>

        <div className='popup-form__table-block'>
          <div className='popup-form__button-block'>
            <Button
              classes='button--add-task'
              text='Выбрать'
              clickHandler={openSelectProductHandler}
            />
            <Button
              classes='button--add-task'
              text='Убрать'
              clickHandler={removeProductFromList}
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
            <div className='popup-form__absence-product'>
              Ни одна партия продукции не добавлена
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

export default PopupFormTask;
