import '../style.scss';
import '../../style.scss';

import LoaderWrapper from '@components/loader/wrapper/Wrapper';
import Map from '@components/map/Map';
import WindowHeaderForm from '@components/windowHeader/form/Form';
import { useRootStore } from '@helpers/RootStoreProvider/useRootStore';
import { observer } from 'mobx-react-lite';
import { FC, useEffect, useState } from 'react';
import { useIsEnoughFreeSpace } from 'src/popup/hooks/floorSpace/useIsEnoughFreeSpace';

const PopupSelectMap: FC = () => {
  const [background, setBackground] = useState<string>('background: ');

  const { storePopup, storeMap } = useRootStore();
  const isEnoughFreeSpace = useIsEnoughFreeSpace();

  function saveHandler() {
    storePopup.status.hide('selectMap');
  }

  function closeHandler() {
    storePopup.status.hide('selectMap');
    storePopup.select.floors.clear();
    storeMap.action.fetch('');
  }

  useEffect(() => {
    storePopup.form.state.isSelectedMap = true;
  }, []);

  useEffect(() => {
    let backgroundColor: string = '#d35f48';
    if (isEnoughFreeSpace) {
      backgroundColor = '#7fa89c';
    }
    setBackground(backgroundColor);
  }, [isEnoughFreeSpace]);

  useEffect(() => {
    if (storeMap.status.get('fetch') === 'pending') {
      storeMap.action.fetch('');
    }
  }, [storeMap.status.get('fetch')]);

  return (
    <>
      <WindowHeaderForm
        title='Выбрать раскладки на складе'
        saveEventHandler={saveHandler}
        closeEventHandler={closeHandler}
      />
      <div
        className='popup-select__free-space-indicator'
        style={{ background }}
      />
      <LoaderWrapper status={storeMap.status.get('fetch')}>
        <Map classes='map-block--select-map' />
      </LoaderWrapper>
    </>
  );
};

export default observer(PopupSelectMap);
