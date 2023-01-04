import { observer } from 'mobx-react-lite';
import { FC, useRef } from 'react';

import { useRootStore } from '../../../utils/RootStoreProvider/useRootStore';

interface ICheckMarkProps {
  value: string;
  text: string;
  classes?: string;
}
const CheckMark: FC<ICheckMarkProps> = observer(({ value, text, classes }) => {
  const { storeState } = useRootStore();

  const inputRef = useRef<HTMLInputElement>(null);

  function changeCheckMarkHandler() {
    storeState.checkMark.changeCheckedMark(value, inputRef.current!.checked);
  }

  return (
    <div className={`check-mark ${classes}`}>
      <input
        id={value}
        ref={inputRef}
        className='check-mark__checkbox'
        type='checkbox'
        value={value}
        onChange={changeCheckMarkHandler}
        checked={storeState.checkMark.checkMark(value)}
      />
      <label
        htmlFor={value}
        className='check-mark__label'
      />
      <p className='check-mark__title'>{text}</p>
    </div>
  );
});

export default CheckMark;