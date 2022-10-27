import React from 'react';
import { render, screen } from '@testing-library/react';
import LetterZone from './LetterZone';

describe('LetterZone Component Render', () => {
	test('letter and font-size', () => {
		render(<LetterZone fontSize={30} zoneLetter='A' />);
		const paragraph = screen.getByText(/A/);
		expect(paragraph).toBeInTheDocument();
		expect(paragraph).toHaveStyle('font-size: 30rem');
	});
});
