import { render, screen } from '@testing-library/react';

import FormBlock from './Block';

describe('FormBlock Component Render', () => {
  test('Сorrect values', () => {
    render(
      <FormBlock
        additionalTitleClasses='test-form-title-modifier'
        titleText='testTitleText'
      >
        <p>testChildren</p>
      </FormBlock>,
    );

    const divElem = screen.getByTestId('form-block-div');
    expect(divElem).toBeInTheDocument();

    const children = screen.getByText(/testChildren/);
    expect(children).toBeInTheDocument();
  });
});
