import { useRootStore } from '@helpers/RootStoreProvider/useRootStore';
import { IUserFormDataFields } from '@store/popup/form/user/type';
import {
  IOneWorkScheduleSelectData,
  TDayOfWeek,
} from '@store/popup/select/workSchedules/type';
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
        const { userInfo } = storeUser.state.user;
        const { workSchedules } = storeUser.state.user;

        Object.entries(userInfo).forEach(([key, element]) => {
          if (key !== 'roleAlias') {
            const typedKey = key as keyof IUserFormDataFields;
            storePopup.form.user.setFormField(typedKey, String(element.value));
          }
        });

        Object.keys(storePopup.select.workSchedules.workSchedules[0]).forEach(
          (key) => {
            const typedKey = key as keyof IOneWorkScheduleSelectData;

            for (let index = 0; index <= 6; index += 1) {
              const newValue = String(
                workSchedules.find((schedule) => schedule.dayOfWeek === index)![
                  typedKey
                ],
              );

              storePopup.select.workSchedules.setFieldWorkScheduleValue(
                index as TDayOfWeek,
                typedKey,
                newValue,
              );
            }
          },
        );

        storePopup.status.show(openingWindow);
      });
    }
  }, []);
}
