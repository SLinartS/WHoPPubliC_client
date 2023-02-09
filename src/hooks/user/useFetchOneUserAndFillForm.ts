import { useRootStore } from '@helpers/RootStoreProvider/useRootStore';
import { IUserFormDataFields } from '@store/popup/form/user/type';
import { TPopups } from '@store/popup/status/type';
import { useCallback } from 'react';

import { useCheckIsSelect } from '../useCheckIsSelect';

export function useFetchOneUserAndFillForm() {
  const { storeUser, storePopup } = useRootStore();
  const checkSelected = useCheckIsSelect();

  return useCallback((openingWindow: TPopups, warningText: string) => {
    const checkResult = checkSelected('users', 'users', warningText);
    if (checkResult.result) {
      storeUser.action.show(checkResult.itemId, () => {
        const { user } = storeUser.state;

        Object.entries(user).forEach(([key, element]) => {
          if (key !== 'roleAlias') {
            const typedKey = key as keyof IUserFormDataFields;
            storePopup.form.user.setFormField(typedKey, String(element.value));
          }
        });

        storePopup.status.show(openingWindow);
      });
    }
  }, []);
}
