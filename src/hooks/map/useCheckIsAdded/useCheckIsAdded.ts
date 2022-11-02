import { useCallback } from 'react';

const useCheckIsAdded = () => {
  const internalCallback = useCallback(
    <T>(
      array: Array<T>,
      value: T[keyof T] | T,
      searchParameter?: keyof T,
    ): boolean => {
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
