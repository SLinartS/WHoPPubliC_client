import { useCallback } from 'react';

import { useIsProductArrayErrors } from './useIsProductArrayErrors';
import { useIsProductFieldErrors } from './useIsProductFieldErrors';

export function useIsProductErrors() {
  const isProductArrayErrors = useIsProductArrayErrors();
  const isProductFieldErrors = useIsProductFieldErrors();

  return useCallback((): boolean => {
    if (isProductArrayErrors() || isProductFieldErrors()) {
      return true;
    }
    return false;
  }, [isProductArrayErrors(), isProductFieldErrors()]);
}
