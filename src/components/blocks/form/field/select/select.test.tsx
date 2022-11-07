import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';

import setupUserEvent from '../../../../../tests/helpers/setupUserEvent';
import {
  TChangeFieldEvent,
  TChangeFieldHandler,
} from '../../../../../types/form/type';
import FormFieldSelect from './Select';

describe('FormFieldSelect Component Render', () => {
  let changeHandler: TChangeFieldHandler;
  const options = [
    {
      id: 1,
      title: 'optionTitle1',
    },
    {
      id: 2,
      title: 'optionTitle2',
    },
    {
      id: 3,
      title: 'optionTitle3',
    },
  ];

  test('Select and options are rendered', () => {
    const value = '';
    render(
      <FormFieldSelect
        options={options}
        value={value}
        changeHandler={changeHandler}
      />,
    );

    expect(
      screen.getByRole('combobox') as HTMLSelectElement,
    ).toBeInTheDocument();
    expect(screen.getAllByRole('option') as HTMLOptionElement[]).toHaveLength(
      4,
    );
  });

  test('Selected option by default', () => {
    const value = '';
    render(
      <FormFieldSelect
        options={options}
        value={value}
        changeHandler={changeHandler}
      />,
    );

    expect(screen.getByRole('combobox') as HTMLSelectElement).toHaveValue(
      'unset',
    );
  });

  test('Selecting an option based on the input value', () => {
    const value = '1';
    render(
      <FormFieldSelect
        options={options}
        value={value}
        changeHandler={changeHandler}
      />,
    );
    expect(screen.getByRole('combobox') as HTMLSelectElement).toHaveValue('1');
  });

  test('Selection of options', async () => {
    let value = '';
    changeHandler = jest.fn((event: TChangeFieldEvent) => {
      value = event.target.value;
    });
    const { user, rerender } = setupUserEvent(
      <FormFieldSelect
        options={options}
        value={value}
        changeHandler={changeHandler}
      />,
    );

    expect(changeHandler).toBeCalledTimes(0);
    await user.selectOptions(
      screen.getByRole('combobox') as HTMLSelectElement,
      '2',
    );
    expect(changeHandler).toBeCalledTimes(1);
    rerender(
      <FormFieldSelect
        options={options}
        value={value}
        changeHandler={changeHandler}
      />,
    );
    expect(screen.getByRole('combobox') as HTMLSelectElement).toHaveValue('2');
  });
});
