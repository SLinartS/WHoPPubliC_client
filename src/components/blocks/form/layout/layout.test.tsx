import { render, screen } from '@testing-library/react';

import FormLayout from './Layout';

describe('FormLayout Component Render', () => {
  test('Сorrect values', () => {
    render(
      <FormLayout additionalСlasses='test-form-layout-modifier'>
        <p>testChildren</p>
      </FormLayout>,
    );
    const divElem = screen.getByTestId('form-layout-div');
    expect(divElem).toBeInTheDocument();
    expect(divElem).toHaveClass('test-form-layout-modifier');

    const children = screen.getByText(/testChildren/);
    expect(children).toBeInTheDocument();
  });
});
