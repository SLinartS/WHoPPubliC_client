import { observer } from 'mobx-react-lite';
import { forwardRef } from 'react';
import { IZoneLetterProps } from '../type';

const LetterZone = observer(
  forwardRef<HTMLParagraphElement, IZoneLetterProps>(
    ({ fontSize, zoneLetter }, ref) => (
      <p
        ref={ref}
        className='map__zone-title'
        style={{
          fontSize: `${fontSize}rem`,
        }}
      >
        {zoneLetter}
      </p>
    ),
  ),
);

export default LetterZone;
