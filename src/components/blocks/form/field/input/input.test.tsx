import { render, screen } from '@testing-library/react';

import setupUserEvent from '../../../../../tests/helpers/setupUserEvent';
import { TChangeFieldHandler } from '../../../../../types/form/type';
import FormFieldInput from './Input';

describe('FormFieldInput Component Render', () => {
  let changeHandler: TChangeFieldHandler;

  test('Input are rendered', () => {
    const value = '';
    render(
      <FormFieldInput
        additionalСlasses='test-form-input-modifier'
        value={value}
        changeHandler={changeHandler}
      />,
    );

    expect(screen.getByRole('textbox') as HTMLInputElement).toBeInTheDocument();
  });

  test('Input default value', () => {
    const value = 'testValueText';
    render(
      <FormFieldInput
        additionalСlasses='test-form-input-modifier'
        value={value}
        changeHandler={changeHandler}
      />,
    );

    expect(screen.getByRole('textbox') as HTMLInputElement).toHaveValue(
      'testValueText',
    );
  });

  test('Entering text in the input', async () => {
    const value = 'testValue';
    changeHandler = jest.fn();

    const { user } = setupUserEvent(
      <FormFieldInput
        additionalСlasses='test-form-input-modifier'
        value={value}
        changeHandler={changeHandler}
      />,
    );

    expect(screen.getByRole('textbox') as HTMLInputElement).toHaveValue(
      'testValue',
    );

    expect(changeHandler).toBeCalledTimes(0);
    await user.type(
      (await screen.findByRole('textbox')) as HTMLInputElement,
      'testInputText',
    );

    expect(changeHandler).toBeCalledTimes(13);
  });
});
