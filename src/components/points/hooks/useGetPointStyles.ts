import { useRootStore } from '@helpers/RootStoreProvider/useRootStore';
import { useMemo } from 'react';

export function useGetPointStyles(id: number) {
  const { storePopup } = useRootStore();

  return useMemo(() => {
    const newStyle = {
      background: '#eaeaea',
    };
    if (storePopup.select.points.checkIsAdded(id)) {
      newStyle.background = `#c15943`;
    } else {
      newStyle.background = `#eaeaea`;
    }
    return newStyle;
  }, [storePopup.select.points.checkIsAdded(id)]);
}
