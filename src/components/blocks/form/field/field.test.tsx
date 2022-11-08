import '@testing-library/jest-dom';

import { screen } from '@testing-library/react';

import RootStore from '../../../../store/root';
import setupStoreProvider from '../../../../tests/helpers/setupStoreProvider';
import { emptyFieldErrorText } from '../../../../utils/formValidator/config';
import FormField from './Field';

describe('FormField Component Render', () => {
  const root = RootStore.getInstance();

  test('FormField are rendered', () => {
    root.storeFormState.isDisplayDefaultErrors = true;
    setupStoreProvider(
      <FormField errors={['testError']}>
        <p>testChildren1</p>
      </FormField>,
    );
    expect(
      screen.getByTestId('form-field') as HTMLDivElement,
    ).toBeInTheDocument();
    expect(
      screen.getByText(/testError/) as HTMLParagraphElement,
    ).toBeInTheDocument();
  });
  test('Сhild elements are added', () => {
    setupStoreProvider(
      <FormField errors={['defaultError']}>
        <p>testChildren1</p>
        <p>testChildren2</p>
      </FormField>,
    );
    expect(
      screen.getByText(/testChildren1/) as HTMLParagraphElement,
    ).toBeInTheDocument();
    expect(
      screen.getByText(/testChildren2/) as HTMLParagraphElement,
    ).toBeInTheDocument();
  });
  test('The error is invisible', () => {
    root.storeFormState.isDisplayDefaultErrors = false;
    setupStoreProvider(
      <FormField errors={[emptyFieldErrorText]}>
        <p>testChildren1</p>
      </FormField>,
    );
    expect(
      screen.queryByText(emptyFieldErrorText) as HTMLParagraphElement,
    ).toBeNull();
  });
});
