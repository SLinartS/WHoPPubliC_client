import { useCallback } from 'react';

export interface ICallbackType {
  <T>(array: T[], value: T[keyof T] | T, searchParameter?: keyof T): boolean;
}

const useCheckIsAdded = () => {
  const internalCallback = useCallback<ICallbackType>(
    (array, value, searchParameter?): boolean => {
      for (const item of array) {
        if (searchParameter) {
          if (item[searchParameter] === value) {
            return true;
          }
        } else if (item === value) {
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
