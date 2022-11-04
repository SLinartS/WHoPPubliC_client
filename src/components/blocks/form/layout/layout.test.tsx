import { render, screen } from '@testing-library/react';

import FormLayout from './Layout';

describe('FormLayout Component Render', () => {
  test('FormLayout are rendered', () => {
    render(
      <FormLayout additionalСlasses='test-form-layout-modifier'>
        <p>testChildren</p>
      </FormLayout>,
    );

    expect(
      screen.getByTestId('form-layout-div') as HTMLDivElement,
    ).toBeInTheDocument();
  });

  test('An additional class is added', () => {
    render(
      <FormLayout additionalСlasses='test-form-layout-modifier'>
        <p>testChildren</p>
      </FormLayout>,
    );

    expect(screen.getByTestId('form-layout-div') as HTMLDivElement).toHaveClass(
      'test-form-layout-modifier',
    );
  });
  test('Сhild elements are added', () => {
    render(
      <FormLayout additionalСlasses='test-form-layout-modifier'>
        <p>testChildren1</p>
        <p>testChildren2</p>
      </FormLayout>,
    );

    expect(
      screen.getByText(/testChildren1/) as HTMLParagraphElement,
    ).toBeInTheDocument();
    expect(
      screen.getByText(/testChildren2/) as HTMLParagraphElement,
    ).toBeInTheDocument();
  });
});
