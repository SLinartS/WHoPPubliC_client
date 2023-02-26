import '@testing-library/jest-dom/extend-expect';

import { render, screen } from '@testing-library/react';

import MapInfoSectionNumber from './sectionNumber';

describe('NumberSection Component Render', () => {
  test('index and font-size', () => {
    render(<MapInfoSectionNumber number={1} />);
    const paragraph = screen.getByText(/1/);
    expect(paragraph).toBeInTheDocument();
  });
});
