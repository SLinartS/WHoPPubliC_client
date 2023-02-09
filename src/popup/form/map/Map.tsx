import Zone from '@components/map/zone/Zone';
import WindowHeaderForm from '@components/windowHeader/form/Form';
import { useRootStore } from '@helpers/RootStoreProvider/useRootStore';
import { observer } from 'mobx-react-lite';
import { FC, ReactNode } from 'react';

const PopupFormMap: FC = () => {
  const { storePopup, storeMap } = useRootStore();

  function saveHandler() {
    storeMap.action.update(() => {
      storePopup.status.hide('formMap');
      storeMap.status.set('fetch', 'pending');
    });
  }

  function closeHandler() {
    storePopup.status.hide('formMap');
  }

  function getCurrentZone(): ReactNode {
    const { currentZone } = storePopup.form.map;
    if (currentZone.id === 0) {
      return <div>Ошибка выбора зоны</div>;
    }
    return (
      <Zone
        id={currentZone.id}
        number={currentZone.number}
        sections={currentZone.sections}
        zoneLetter={currentZone.zoneLetter}
        index={0}
        isEdit
      />
    );
  }

  return (
    <>
      <WindowHeaderForm
        title={`Изменить структуру зоны ${storePopup.form.map.currentZone.zoneLetter}`}
        saveEventHandler={saveHandler}
        closeEventHandler={closeHandler}
      />
      <div className='popup-form__content-block popup-form__content-block--add-map'>
        {getCurrentZone()}
      </div>
    </>
  );
};

export default observer(PopupFormMap);
