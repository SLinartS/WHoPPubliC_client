import '../style.scss';
import '../../style.scss';

import Button from '@components/button/Button';
import AssembledBlockFieldInput from '@components/form/assembled/BlockFieldInput';
import AssembledBlockFieldText from '@components/form/assembled/BlockFieldText';
import FormBlock from '@components/form/block/Block';
import FormBlockTitle from '@components/form/block/title/Title';
import FormField from '@components/form/field/Field';
import FormFieldPoint from '@components/form/field/point/Point';
import FormLayout from '@components/form/layout/Layout';
import Table from '@components/table/Table';
import WindowHeaderForm from '@components/windowHeader/form/Form';
import { useRootStore } from '@helpers/RootStoreProvider/useRootStore';
import { useFetchOneTaskAndFillForm } from '@hooks/task/useFetchOneTaskAndFillForm';
import { observer } from 'mobx-react-lite';
import { FC, useEffect, useMemo } from 'react';

const PopupFormTask: FC = () => {
  const { storePopup, storeTask, storeProduct, storeState, storeTable } =
    useRootStore();
  const fetchOneTaskAndFillFormHook = useFetchOneTaskAndFillForm();

  function generateArticle() {
    const generateArticleForTask = async () => {
      const generatedArticle =
        await storePopup.form.utils.utils.generateArticle('task');

      storePopup.form.task.setFormField('article', generatedArticle);
    };
    generateArticleForTask();
  }

  const typeOfTaskForm = useMemo(() => {
    const { currentTypeOfTask } = storeState.interface;
    if (currentTypeOfTask === 'acceptance' || currentTypeOfTask === 'intra') {
      return 1;
    }
    return 2;
  }, [storeState.interface.currentTypeOfTask]);

  const windowTitle = useMemo(() => {
    switch (storeState.interface.currentTypeOfTask) {
      case 'acceptance':
        return 'Добавить задачу распределения';
      case 'intra':
        return 'Добавить внутрискладскую задачу';
      case 'shipment':
        return 'Добавить задачу отгрузки';
      default:
        return '';
    }
  }, [storeState.interface.currentTypeOfTask]);

  function resetHandler() {
    const { formActionType } = storePopup.form.state;
    if (formActionType === 'create') {
      generateArticle();
    }
    if (formActionType === 'change') {
      fetchOneTaskAndFillFormHook(
        storeState.interface.currentTypeOfTask,
        'formTask',
        'Выберите строку, чтобы изменить задачу',
      );
    }
  }

  function closeHandler() {
    storePopup.status.hide('formTask');
    storePopup.form.utils.utils.resetForm();
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
            closeHandler();
          });
          break;
        case 'change':
          storeTask.update.task(() => {
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
  }, [storeState.interface.currentTypeOfTask]);

  useEffect(() => {
    if (storePopup.form.state.formActionType === 'create') {
      generateArticle();
    }
  }, []);

  return (
    <>
      <WindowHeaderForm
        title={windowTitle}
        resetEventHandler={resetHandler}
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
            fieldName='timeStart'
            titleText='Дата начала'
            readonlyInput={false}
            placeholder='2022.09.26 16:08:30'
          />
          <AssembledBlockFieldInput
            typeForm='task'
            fieldName='timeEnd'
            titleText='Дата окончания'
            readonlyInput={false}
            placeholder='2022.09.27 10:00:20'
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
    </>
  );
};

export default observer(PopupFormTask);
