import { observer } from 'mobx-react-lite';
import { FC, useRef, useState } from 'react';

import Button from '../../../../button/Button';
import TransitionCustom from '../../../../transition/Transition';
import { ITableColumnShellProps } from '../type';

const TableColumnShellDelete: FC<ITableColumnShellProps> = observer(
  ({ children, additionalClasses }) => {
    const [isButtonVisible, setIsButtonVisible] = useState<boolean>(false);
    const [isParagraphVisible, setIsParagraphVisible] = useState<boolean>(true);
    const buttonNodeRef = useRef<HTMLDivElement>(null);
    const paragraphNodeRef = useRef<HTMLDivElement>(null);

    function mouseEnterHandler() {
      setIsButtonVisible(true);
      setIsParagraphVisible(false);
    }

    function mouseLeaveHandler() {
      setIsButtonVisible(false);
      setIsParagraphVisible(true);
    }

    return (
      <div
        className={`table__column-shell ${additionalClasses}`}
        onMouseEnter={mouseEnterHandler}
        onMouseLeave={mouseLeaveHandler}
      >
        <TransitionCustom
          key='transition-button'
          classNames='column-shell'
          nodeRef={buttonNodeRef}
          timeout={400}
          trigger={isButtonVisible}
        >
          <Button
            text='Удалить'
            additionalСlasses='button__delete'
          />
        </TransitionCustom>

        <TransitionCustom
          key='transition-paragraph'
          classNames='column-shell'
          nodeRef={paragraphNodeRef}
          timeout={400}
          trigger={isParagraphVisible}
        >
          {children}
        </TransitionCustom>
      </div>
    );
  },
);

export default TableColumnShellDelete;
