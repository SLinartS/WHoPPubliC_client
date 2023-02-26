import '@testing-library/jest-dom/extend-expect';

import { render, screen } from '@testing-library/react';

import MapInfoZoneLetter from './ZoneLetter';

describe('LetterZone Component Render', () => {
  test('letter and font-size', () => {
    render(<MapInfoZoneLetter zoneLetter='A' />);
    const paragraph = screen.getByText(/A/);
    expect(paragraph).toBeInTheDocument();
  });
});
