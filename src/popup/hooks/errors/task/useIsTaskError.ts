import { useCallback } from 'react';

import { useIsTaskArrayErrors } from './useIsTaskArrayError';
import { useIsTaskFieldErrors } from './useIsTaskFieldError';

export function useIsTaskErrors() {
  const isTaskArrayErrors = useIsTaskArrayErrors();
  const isTaskFieldErrors = useIsTaskFieldErrors();

  return useCallback((isCheckFloor: boolean = true): boolean => {
    if (isTaskFieldErrors() || isTaskArrayErrors(isCheckFloor)) {
      return true;
    }
    return false;
  }, []);
}
