import { useCallback } from 'react';

import { useIsProductArrayErrors } from './useIsProductArrayErrors';
import { useIsProductFieldErrors } from './useIsProductFieldErrors';
import { useIsProductFileErrors } from './useIsProductFileErrors';

export function useIsProductErrors() {
  const isProductArrayErrors = useIsProductArrayErrors();
  const isProductFieldErrors = useIsProductFieldErrors();
  const isProductFileErrors = useIsProductFileErrors();

  return useCallback((): boolean => {
    if (
      isProductFieldErrors() ||
      isProductArrayErrors() ||
      isProductFileErrors()
    ) {
      return true;
    }
    return false;
  }, []);
}
