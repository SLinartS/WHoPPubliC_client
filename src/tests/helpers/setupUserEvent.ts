import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ReactElement } from 'react';

export default function setupUserEvent(component: ReactElement) {
  return {
    user: userEvent.setup(),
    rerender: render(component).rerender,
  };
}
