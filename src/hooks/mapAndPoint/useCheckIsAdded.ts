import { useCallback } from 'react';

export interface ICallbackType {
  <T>(array: T[], value: T): boolean;
}

const useCheckIsAdded = () => {
  const internalCallback = useCallback<ICallbackType>(
    (array, value): boolean => {
      for (const item of array) {
        if (item === value) {
          return true;
        }
      }
      return false;
    },
    [],
  );

  return internalCallback;
};

export default useCheckIsAdded;
