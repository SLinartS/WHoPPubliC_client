import './style.scss';

import { useRootStore } from '@helpers/RootStoreProvider/useRootStore';
import { IOption } from '@store/category/type';
import { IProductFormDataFields } from '@store/popup/form/product/type';
import { observer } from 'mobx-react-lite';
import { FC, useEffect, useMemo, useState } from 'react';

interface IFormFieldSelectProps {
  options: IOption[];
  fieldName: keyof IProductFormDataFields;
}

const initialCurrentOption: IOption = {
  id: 1,
  title: '',
};

const FormFieldSelect: FC<IFormFieldSelectProps> = ({ options, fieldName }) => {
  const { storePopup, storeCategory } = useRootStore();

  const getValue = useMemo(() => {
    return storePopup.form.product.getFormField(fieldName);
  }, [storePopup.form.product.getFormField(fieldName)]);

  const [isOpenDowndrop, setIsOpenDownDrop] = useState<boolean>(false);

  const [currentOption, setCurrentOption] =
    useState<IOption>(initialCurrentOption);

  function changeFieldHandler(option: IOption) {
    storePopup.form.product.setFormField(fieldName, String(option.id));
    setCurrentOption({ id: option.id, title: option.title });
    setIsOpenDownDrop(false);
  }

  function getText() {
    const text = currentOption.title;
    if (text.length >= 30) {
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

  useEffect(() => {
    if (storeCategory.status.get('fetch') === 'done') {
      setCurrentOption({
        id: Number(getValue),
        title: options[Number(getValue) - 1].title,
      });
    }
  }, [storeCategory.status.get('fetch'), getValue]);

  return (
    <div className='custom-select'>
      <button
        type='button'
        className='custom-select__button'
        onClick={() => setIsOpenDownDrop(!isOpenDowndrop)}
      >
        {getText()}
      </button>
      {isOpenDowndrop && (
        <div className='custom-select__downdrop'>
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
                changeFieldHandler({ id: option.id, title: option.title })
              }
            >
              <p className='custom-select__text'>{option.title}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default observer(FormFieldSelect);
