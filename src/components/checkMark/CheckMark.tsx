import './style.scss';

import { useRootStore } from '@helpers/RootStoreProvider/useRootStore';
import { TMarkType } from '@store/state/type';
import { observer } from 'mobx-react-lite';
import { FC, useRef } from 'react';

interface ICheckMarkProps {
  value: string;
  text: string;
  mark: TMarkType;
  classes?: string;
}
const CheckMark: FC<ICheckMarkProps> = ({ value, text, mark, classes }) => {
  const { storeState } = useRootStore();

  const inputRef = useRef<HTMLInputElement>(null);

  function errorStub() {}

  function onClickCheckMarkHandler() {
    storeState.checkMark.changeCheckedMark(
      value,
      !inputRef.current!.checked,
      mark,
    );
  }

  return (
    <div className={`check-mark ${classes}`}>
      <input
        id={value + mark}
        ref={inputRef}
        className='check-mark__checkbox'
        type='checkbox'
        value={value}
        onChange={errorStub}
        checked={storeState.checkMark.checkMark(value, mark)}
      />
      <label
        htmlFor={value + mark}
        className='check-mark__label'
        onClick={onClickCheckMarkHandler}
      />
      <p className='check-mark__title'>{text}</p>
    </div>
  );
};

export default observer(CheckMark);
