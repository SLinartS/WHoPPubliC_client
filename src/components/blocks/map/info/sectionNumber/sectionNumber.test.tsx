import { render, screen } from '@testing-library/react';

import MapInfoSectionNumber from './sectionNumber';

describe('NumberSection Component Render', () => {
  test('index and font-size', () => {
    render(
      <MapInfoSectionNumber
        fontSize={10}
        number={1}
      />,
    );
    const paragraph = screen.getByText(/1/);
    expect(paragraph).toBeInTheDocument();
    expect(paragraph).toHaveStyle('font-size: 10rem');
  });
});
