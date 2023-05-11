import './style.scss';

import { IOption } from '@store/category/type';
import { observer } from 'mobx-react-lite';
import { FC, useState } from 'react';

interface IFormFieldSelectProps {
  options: IOption[];
  currentOption: IOption;
  changeHandler: (option: IOption) => void;
}

const FormFieldSelect: FC<IFormFieldSelectProps> = ({
  options,
  currentOption,
  changeHandler,
}) => {
  const [isOpenDownDrop, setIsOpenDownDrop] = useState<boolean>(false);

  function changeFieldHandler(option: IOption) {
    changeHandler(option);
    setIsOpenDownDrop(false);
  }

  function getText() {
    const text = currentOption.alias;
    if (text?.length >= 30) {
      const animationDuration = Math.round(250000 / text.length);
      return (
        <>
          <p
            className='custom-select__text custom-select__text--button'
            style={{
              animation: `running-line ${animationDuration}ms linear infinite`,
            }}
          >
            {text}
          </p>
          <p
            className='custom-select__text custom-select__text-phantom'
            style={{
              animation: `running-line-phantom ${animationDuration}ms linear infinite`,
            }}
          >
            {text}
          </p>
        </>
      );
    }
    return (
      <p className='custom-select__text custom-select__text--button'>{text}</p>
    );
  }

  return (
    <div className='custom-select'>
      <button
        type='button'
        className='custom-select__button'
        onClick={() => setIsOpenDownDrop(!isOpenDownDrop)}
      >
        {getText()}
      </button>
      {isOpenDownDrop && (
        <div className='custom-select__down-drop'>
          {options.map((option) => (
            <div
              className={`custom-select__option ${
                currentOption.id === option.id
                  ? 'custom-select__option--active'
                  : ''
              }`}
              key={option.id}
              data-option-value={option.id}
              onClick={() =>
                changeFieldHandler({
                  id: option.id,
                  title: option.title,
                  alias: option.alias,
                })
              }
            >
              <p className='custom-select__text'>{option.alias}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default observer(FormFieldSelect);
