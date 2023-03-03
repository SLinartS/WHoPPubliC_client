import AssembledBlockFieldInput from '@components/form/assembled/BlockFieldInput';
import AssembledBlockFieldSelect from '@components/form/assembled/BlockFieldSelect';
import FormLayout from '@components/form/layout/Layout';
import WindowHeaderForm from '@components/windowHeader/form/Form';
import { useRootStore } from '@helpers/RootStoreProvider/useRootStore';
import { IOption } from '@store/category/type';
import { IUserFormDataFields } from '@store/popup/form/user/type';
import { observer } from 'mobx-react-lite';
import { FC, useEffect, useMemo } from 'react';
import { useIsUserError } from 'src/popup/hooks/errors/user/useIsUserErrors';

const PopupFormUser: FC = () => {
  const { storePopup, storeRole, storeUser } = useRootStore();
  const isUserError = useIsUserError();

  function closeHandler() {
    storePopup.status.hide('formUser');
  }

  function resetHandler() {}

  function saveHandler() {
    const { formActionType } = storePopup.form.state;

    if (formActionType === 'create') {
      storePopup.form.user.setFormField('id', '0');
    }

    if (!isUserError()) {
      switch (formActionType) {
        case 'create':
          storeUser.action.store(() => {
            storePopup.status.hide('formUser', () => {
              storePopup.form.user.clearFormData();
            });
            storeUser.status.set('fetch', 'pending');
          });
          break;
        case 'update':
          storeUser.action.update(() => {
            storePopup.status.hide('formUser', () => {
              storePopup.form.user.clearFormData();
            });
            storeUser.status.set('fetch', 'pending');
          });
          break;
        default:
      }
    }
  }

  function openSelectWorkSchedulesHandler() {
    storePopup.status.show('selectWorkSchedule');
  }

  function changeSelectHandler(option: IOption) {
    storePopup.form.user.setFormField('roleId', String(option.id));
  }

  function changeFieldHandler(
    newValue: string,
    fieldName: keyof IUserFormDataFields,
  ) {
    storePopup.form.user.setFormField(fieldName, String(newValue));
  }

  const currentRoleValue = useMemo(() => {
    const id = Number(storePopup.form.user.getFormField('roleId'));
    const title = storeRole.state.roles.find((role) => role.id === id)?.title;
    if (title) {
      return { id, title };
    }
    return { id, title: '' };
  }, [
    storeRole.status.get('fetch'),
    storePopup.form.user.getFormField('roleId'),
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
      <div className='popup-form__content-block popup-form__content-block--add-user'>
        <FormLayout classes='name-info'>
          <AssembledBlockFieldInput
            value={storePopup.form.user.getFormField('name')}
            errors={storePopup.form.user.getFormErrors('name')}
            changeHandler={changeFieldHandler}
            typeForm='user'
            fieldName='name'
            titleText='Имя'
            placeholder='Иван'
          />
          <AssembledBlockFieldInput
            value={storePopup.form.user.getFormField('surname')}
            errors={storePopup.form.user.getFormErrors('surname')}
            changeHandler={changeFieldHandler}
            typeForm='user'
            fieldName='surname'
            titleText='Фамилия'
            placeholder='Иванович'
          />
          <AssembledBlockFieldInput
            value={storePopup.form.user.getFormField('patronymic')}
            errors={storePopup.form.user.getFormErrors('patronymic')}
            changeHandler={changeFieldHandler}
            typeForm='user'
            fieldName='patronymic'
            titleText='Отчество'
            placeholder='Иванов'
          />
          <div>
            <button
              type='button'
              onClick={openSelectWorkSchedulesHandler}
            >
              График работы
            </button>
          </div>
        </FormLayout>

        <FormLayout classes='contact-info'>
          <AssembledBlockFieldInput
            value={storePopup.form.user.getFormField('email')}
            errors={storePopup.form.user.getFormErrors('email')}
            changeHandler={changeFieldHandler}
            typeForm='user'
            fieldName='email'
            titleText='E-mail'
            placeholder='inan-ivanov-95@mail.ru'
          />
          <AssembledBlockFieldInput
            value={storePopup.form.user.getFormField('phone')}
            errors={storePopup.form.user.getFormErrors('phone')}
            changeHandler={changeFieldHandler}
            typeForm='user'
            fieldName='phone'
            titleText='Номер телефона'
            placeholder='+79251610503'
          />
        </FormLayout>

        <FormLayout classes='login-info'>
          <AssembledBlockFieldInput
            value={storePopup.form.user.getFormField('login')}
            errors={storePopup.form.user.getFormErrors('login')}
            changeHandler={changeFieldHandler}
            typeForm='user'
            fieldName='login'
            titleText='Логин'
            placeholder='JDU34'
          />
          <AssembledBlockFieldSelect
            options={storeRole.state.roles}
            errors={storePopup.form.user.getFormErrors('roleId')}
            changeHandler={changeSelectHandler}
            currentOption={currentRoleValue}
            typeForm='user'
            fieldName='roleId'
            titleText='Роль'
          />
          <AssembledBlockFieldInput
            value={storePopup.form.user.getFormField('password')}
            errors={storePopup.form.user.getFormErrors('password')}
            changeHandler={changeFieldHandler}
            typeForm='user'
            fieldName='password'
            titleText='Пароль'
            placeholder='*******'
          />
        </FormLayout>
      </div>
    </>
  );
};

export default observer(PopupFormUser);
