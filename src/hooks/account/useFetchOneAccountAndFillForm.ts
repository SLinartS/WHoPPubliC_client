import { useRootStore } from '@helpers/RootStoreProvider/useRootStore';
import { IAccountFormDataFields } from '@store/popup/form/account/type';
import { TPopups } from '@store/popup/status/type';
import { useCallback } from 'react';

import { useCheckIsSelect } from '../useCheckIsSelect';

export function useFetchOneAccountAndFillForm() {
  const { storeAccount, storePopup } = useRootStore();
  const checkSelected = useCheckIsSelect();

  return useCallback((openingWindow: TPopups, warningText: string) => {
    const checkResult = checkSelected('accounts', 'accounts', warningText);
    if (checkResult.result) {
      storeAccount.action.show(checkResult.itemId, () => {
        const { account } = storeAccount.state;

        Object.entries(account).forEach(([key, element]) => {
          if (key !== 'roleAlias') {
            const typedKey = key as keyof IAccountFormDataFields;
            storePopup.form.account.setFormField(
              typedKey,
              String(element.value),
            );
          }
        });

        storePopup.status.show(openingWindow);
      });
    }
  }, []);
}
