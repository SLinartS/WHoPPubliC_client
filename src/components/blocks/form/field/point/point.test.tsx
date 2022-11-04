import { render, screen } from '@testing-library/react';
import { MouseEventHandler } from 'react';

import setupUserEvent from '../../../../../tests/helpers/setupUserEvent';
import FormFieldPoint from './Point';

describe('FormFieldPoint Component Render', () => {
  let clickHandler: MouseEventHandler<HTMLButtonElement>;

  test('Point are rendered', () => {
    render(<FormFieldPoint clickHandler={clickHandler} />);

    expect(screen.getByRole('button') as HTMLButtonElement).toBeInTheDocument();
  });

  test('Point click event', async () => {
    clickHandler = jest.fn();
    const { user } = setupUserEvent(
      <FormFieldPoint clickHandler={clickHandler} />,
    );

    expect(clickHandler).toBeCalledTimes(0);
    await user.click((await screen.findByRole('button')) as HTMLButtonElement);
    expect(clickHandler).toBeCalledTimes(1);
  });
});
