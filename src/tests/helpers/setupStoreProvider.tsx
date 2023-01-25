import { ReactElement } from 'react';
import { RootStoreProvider } from '@helpers/RootStoreProvider/RootStoreProvider';
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
