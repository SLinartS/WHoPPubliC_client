import { render, screen } from '@testing-library/react';

import FormBlock from './Block';

describe('FormBlock Component Render', () => {
  test('FormBlock are rendered', () => {
    render(
      <FormBlock
        additionalTitleClasses='test-form-title-modifier'
        titleText='testTitleText'
      >
        <p>testChildren1</p>
        <p>testChildren2</p>
      </FormBlock>,
    );
    expect(
      screen.getByTestId('form-block-div') as HTMLDivElement,
    ).toBeInTheDocument();
  });

  test('Сhild elements are added', () => {
    render(
      <FormBlock
        additionalTitleClasses='test-form-title-modifier'
        titleText='testTitleText'
      >
        <p>testChildren1</p>
        <p>testChildren2</p>
      </FormBlock>,
    );
    expect(
      screen.getByText(/testChildren1/) as HTMLParagraphElement,
    ).toBeInTheDocument();
    expect(
      screen.getByText(/testChildren2/) as HTMLParagraphElement,
    ).toBeInTheDocument();
  });
});
