import { observer } from 'mobx-react-lite';
import { FC, useEffect, useMemo } from 'react';

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
  const { storePopup, storeTask, storeProduct, storeState, storeTable } =
    useRootStore();

  const typeOfTaskForm = useMemo(() => {
    const currentTypeOfTask = storeState.interface.getCurrentTypeOfTask();
    if (currentTypeOfTask === 'acceptance' || currentTypeOfTask === 'intra') {
      return 1;
    }
    return 2;
  }, [storeState.interface.getCurrentTypeOfTask()]);

  const windowTitle = useMemo(() => {
    switch (storeState.interface.getCurrentTypeOfTask()) {
      case 'acceptance':
        return 'Добавить задачу распределения';
      case 'intra':
        return 'Добавить внутрискладскую задачу';
      case 'shipment':
        return 'Добавить задачу отгрузки';
      default:
        return '';
    }
  }, [storeState.interface.getCurrentTypeOfTask()]);

  function closeHandler() {
    storePopup.status.hide('formTask');
    storePopup.form.utils.utils.resetForm();
    storeTask.status.setFetch(
      storeState.interface.getCurrentTypeOfTask(),
      'pending',
    );
  }

  function saveHandler() {
    const { formActionType } = storePopup.form.state;

    if (formActionType === 'create') {
      storePopup.form.task.setFormField('id', '0');
    }

    const checkFloor = typeOfTaskForm === 1;

    if (!storePopup.form.utils.error.isTaskErrors(checkFloor)) {
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
    storePopup.status.show('selectMap');
  }

  function openSelectPointsHandler() {
    storePopup.status.show('selectPoints');
  }

  function openSelectProductHandler() {
    storePopup.status.show('selectProducts');
  }

  function removeProductFromList() {
    storePopup.select.products.removeProductFromList();
  }

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

  useEffect(() => {
    if (storePopup.form.state.formActionType === 'create') {
      const generateArticleForTask = async () => {
        const generatedArticle =
          await storePopup.form.utils.utils.generateArticle('task');

        storePopup.form.task.setFormField('article', generatedArticle);
      };
      generateArticleForTask();
    }
  }, []);

  return (
    <div className='popup popup__popup-form popup-form popup-form--add-task'>
      <WindowHeaderForm
        title={windowTitle}
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
          {typeOfTaskForm === 1 ? (
            <FormBlock
              titleText=''
              classes='task-points'
            >
              <FormField
                typeForm='custom'
                customErrors={storePopup.select.floors.errors}
                classes='task-points'
              >
                <FormFieldPoint clickHandler={openSelectMapHandler} />
              </FormField>
              <FormBlockTitle
                text='Склад'
                classes='task-points'
              />
            </FormBlock>
          ) : (
            <FormBlock
              titleText=''
              classes='task-points'
            >
              <FormField
                typeForm='custom'
                customErrors={storePopup.select.points.errors}
                classes='task-points'
              >
                <FormFieldPoint clickHandler={openSelectPointsHandler} />
              </FormField>
              <FormBlockTitle
                text='Точки'
                classes='task-points'
              />
            </FormBlock>
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
              data={storePopup.select.products.getProductListData()}
              keyWord='article'
              valuesType='products'
              selectingValues='products'
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
// storePopup.form.state.isInProductForm = false;
export default PopupFormTask;
