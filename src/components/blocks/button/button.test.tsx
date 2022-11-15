import '@testing-library/jest-dom';

import { screen } from '@testing-library/react';

import setupUserEvent from '../../../tests/helpers/setupUserEvent';
import Button from './Button';

describe('Button Component Render', () => {
  test('Button are rendered', async () => {
    const clickHandler = jest.fn();

    setupUserEvent(
      <Button
        text='TestButtonText'
        additionalСlasses='test-button-class'
        clickHandler={clickHandler}
      />,
    );

    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  test('An additional class is added', async () => {
    const clickHandler = jest.fn();

    setupUserEvent(
      <Button
        text='TestButtonText'
        additionalСlasses='test-button-class'
        clickHandler={clickHandler}
      />,
    );

    expect(screen.getByRole('button')).toHaveClass('test-button-class');
  });

  test('Сlick on the button', async () => {
    const clickHandler = jest.fn();

    const { user } = setupUserEvent(
      <Button
        text='TestButtonText'
        additionalСlasses='test-button-class'
        clickHandler={clickHandler}
      />,
    );

    expect(clickHandler).toBeCalledTimes(0);
    await user.click(await screen.findByRole('button'));
    expect(clickHandler).toBeCalledTimes(1);
  });
});
