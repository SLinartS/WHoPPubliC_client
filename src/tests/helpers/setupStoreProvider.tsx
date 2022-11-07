import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ReactElement } from 'react';
import { RootStoreProvider } from '../../utils/RootStoreProvider/RootStoreProvider';
import setupUserEvent from './setupUserEvent';

export default function setupStoreProvider(component: ReactElement) {
  const { user, rerender } = setupUserEvent(
    <RootStoreProvider>{component}</RootStoreProvider>,
  );

  return {
    user: user,
    rerender: rerender,
  };
}
