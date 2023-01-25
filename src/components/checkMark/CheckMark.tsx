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

  function changeCheckMarkHandler() {
    storeState.checkMark.changeCheckedMark(
      value,
      inputRef.current!.checked,
      mark,
    );
  }

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
      <p
        className='check-mark__title'
        onClick={onClickCheckMarkHandler}
      >
        {text}
      </p>
    </div>
  );
};

export default observer(CheckMark);
