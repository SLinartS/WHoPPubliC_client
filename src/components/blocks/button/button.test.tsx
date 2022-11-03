import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Button from './Button';

describe('Button Component Render', () => {
  test('Сorrect values', () => {
    const clickHandler = jest.fn();

    render(
      <Button
        text='TestButtonText'
        additionalСlasses='test-button-class'
        clickEvent={clickHandler}
      />,
    );
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('test-button-class');
    expect(clickHandler).toBeCalledTimes(0);
    userEvent.click(button);
    expect(clickHandler).toBeCalledTimes(1);
  });
});
