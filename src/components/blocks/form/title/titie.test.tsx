import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';

import FormTitle from './Title';

describe('FormTitle Component Render', () => {
  test('Title are rendered', () => {
    render(
      <FormTitle
        classes='test-form-title-modifier'
        text='testTitleText'
      />,
    );
    const paragraph = screen.getByText(/testTitleText/);
    expect(paragraph).toBeInTheDocument();
  });

  test('An additional class is added', () => {
    render(
      <FormTitle
        classes='test-form-title-modifier'
        text='testTitleText'
      />,
    );
    const paragraph = screen.getByText(/testTitleText/);
    expect(paragraph).toHaveClass('test-form-title-modifier');
  });
});
