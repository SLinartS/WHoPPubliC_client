import AssembledBlockFieldInput from '@components/form/assembled/BlockFieldInput';
import AssembledBlockFieldSelect from '@components/form/assembled/BlockFieldSelect';
import FormLayout from '@components/form/layout/Layout';
import WindowHeaderForm from '@components/windowHeader/form/Form';
import { useRootStore } from '@helpers/RootStoreProvider/useRootStore';
import { IOption } from '@store/category/type';
import { observer } from 'mobx-react-lite';
import { FC, useEffect, useMemo } from 'react';
import { useIsAccountError } from 'src/popup/hooks/errorCheck/useIsAccountErrors';

const PopupFormAccount: FC = () => {
  const { storePopup, storeRole, storeAccount } = useRootStore();
  const isAccountError = useIsAccountError();

  function closeHandler() {
    storePopup.status.hide('formAccount');
  }

  function resetHandler() {}

  function saveHandler() {
    const { formActionType } = storePopup.form.state;

    if (formActionType === 'create') {
      storePopup.form.account.setFormField('id', '0');
    }

    if (!isAccountError()) {
      switch (formActionType) {
        case 'create':
          storeAccount.action.store(() => {
            storePopup.status.hide('formAccount', () => {
              storePopup.form.account.clearFormData();
            });
            storeAccount.status.set('fetch', 'pending');
          });
          break;
        case 'change':
          storeAccount.action.update(() => {
            storePopup.status.hide('formAccount', () => {
              storePopup.form.account.clearFormData();
            });
            storeAccount.status.set('fetch', 'pending');
          });
          break;
        default:
      }
    } else {
      storePopup.form.state.isDisplayDefaultErrors = true;
    }
  }

  function changeSelectHandler(option: IOption) {
    storePopup.form.account.setFormField('roleId', String(option.id));
  }

  const currentRoleValue = useMemo(() => {
    const id = Number(storePopup.form.account.getFormField('roleId'));
    const title = storeRole.state.roles.find((role) => role.id === id)?.title;
    if (title) {
      return { id, title };
    }
    return { id, title: '' };
  }, [
    storeRole.status.get('fetch'),
    storePopup.form.account.getFormField('roleId'),
  ]);

  useEffect(() => {
    if (storeRole.status.get('fetch') === 'pending') {
      storeRole.action.fetch();
    }
  }, [storeRole.status.get('fetch')]);

  return (
    <>
      <WindowHeaderForm
        title='Добавить партию товара'
        resetEventHandler={resetHandler}
        saveEventHandler={saveHandler}
        closeEventHandler={closeHandler}
      />
      <div className='popup-form__content-block popup-form__content-block--add-account'>
        <FormLayout classes='name-info'>
          <AssembledBlockFieldInput
            typeForm='account'
            fieldName='name'
            titleText='Имя'
            readonlyInput={false}
            placeholder='Иван'
          />
          <AssembledBlockFieldInput
            typeForm='account'
            fieldName='surname'
            titleText='Фамилия'
            readonlyInput={false}
            placeholder='Иванович'
          />
          <AssembledBlockFieldInput
            typeForm='account'
            fieldName='patronymic'
            titleText='Отчество'
            readonlyInput={false}
            placeholder='Иванов'
          />
        </FormLayout>

        <FormLayout classes='contact-info'>
          <AssembledBlockFieldInput
            typeForm='account'
            fieldName='email'
            titleText='E-mail'
            readonlyInput={false}
            placeholder='inan-ivanov-95@mail.ru'
          />
          <AssembledBlockFieldInput
            typeForm='account'
            fieldName='phone'
            titleText='Номер телефона'
            readonlyInput={false}
            placeholder='+7 (925) 161-05-03'
          />
        </FormLayout>

        <FormLayout classes='login-info'>
          <AssembledBlockFieldInput
            typeForm='account'
            fieldName='login'
            titleText='Логин'
            readonlyInput={false}
            placeholder='JDU34'
          />
          <AssembledBlockFieldSelect
            typeForm='account'
            fieldName='roleId'
            titleText='Роль'
            options={storeRole.state.roles}
            currentOption={currentRoleValue}
            changeHandler={changeSelectHandler}
          />
          <AssembledBlockFieldInput
            typeForm='account'
            fieldName='password'
            titleText='Пароль'
            readonlyInput={false}
            placeholder='*******'
          />
        </FormLayout>
      </div>
    </>
  );
};

export default observer(PopupFormAccount);
