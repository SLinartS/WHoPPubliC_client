import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ChangeEventHandler } from 'react';

import { TChangeFieldEvent } from '../../../../../types/form/type';
import FormFieldSelect from './Select';

describe('FormFieldSelect Component Render', () => {
  let clickHandler: ChangeEventHandler<HTMLInputElement | HTMLSelectElement>;
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
        changeEvent={clickHandler}
      />,
    );

    expect(
      screen.getByRole('combobox') as HTMLSelectElement,
    ).toBeInTheDocument();
    expect(
      screen.getByRole('option', {
        name: /--- Выберите категорию ---/,
      }) as HTMLOptionElement,
    ).toBeInTheDocument();
    expect(
      screen.getByRole('option', {
        name: /optionTitle1/,
      }) as HTMLOptionElement,
    ).toBeInTheDocument();
    expect(
      screen.getByRole('option', {
        name: /optionTitle2/,
      }) as HTMLOptionElement,
    ).toBeInTheDocument();
    expect(
      screen.getByRole('option', {
        name: /optionTitle3/,
      }) as HTMLOptionElement,
    ).toBeInTheDocument();
  });

  test('Selected option by default', () => {
    const value = '';
    render(
      <FormFieldSelect
        options={options}
        value={value}
        changeEvent={clickHandler}
      />,
    );

    expect((screen.getByRole('combobox') as HTMLSelectElement).value).toBe(
      'unset',
    );
  });

  test('Selecting an option based on the input value', () => {
    const value = '1';
    render(
      <FormFieldSelect
        options={options}
        value={value}
        changeEvent={clickHandler}
      />,
    );
    expect((screen.getByRole('combobox') as HTMLSelectElement).value).toBe('1');
  });

  test('Selection of options', () => {
    let value = '';

    clickHandler = jest.fn((event: TChangeFieldEvent) => {
      value = event.target.value;
    });

    const { rerender } = render(
      <FormFieldSelect
        options={options}
        value={value}
        changeEvent={clickHandler}
      />,
    );

    expect(clickHandler).toBeCalledTimes(0);
    userEvent.selectOptions(
      screen.getByRole('combobox') as HTMLSelectElement,
      '2',
    );
    expect(clickHandler).toBeCalledTimes(1);
    rerender(
      <FormFieldSelect
        options={options}
        value={value}
        changeEvent={clickHandler}
      />,
    );
    expect((screen.getByRole('combobox') as HTMLSelectElement).value).toBe('2');

    userEvent.selectOptions(
      screen.getByRole('combobox') as HTMLSelectElement,
      '1',
    );
    expect(clickHandler).toBeCalledTimes(2);
    rerender(
      <FormFieldSelect
        options={options}
        value={value}
        changeEvent={clickHandler}
      />,
    );
    expect((screen.getByRole('combobox') as HTMLSelectElement).value).toBe('1');
  });
});
