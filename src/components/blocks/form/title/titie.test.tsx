import { render, screen } from '@testing-library/react';

import FormTitle from './Title';

describe('FormTitle Component Render', () => {
  test('Сorrect values', () => {
    render(
      <FormTitle
        additionalСlasses='test-form-title-modifier'
        text='testTitleText'
      />,
    );
    const paragraph = screen.getByText(/testTitleText/);
    expect(paragraph).toBeInTheDocument();
    expect(paragraph).toHaveClass('test-form-title-modifier');
  });
});
