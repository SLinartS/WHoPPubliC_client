import { observer } from 'mobx-react-lite';
import { forwardRef } from 'react';
import { ISectionNumberProps } from '../type';

const NumberSection = observer(
  forwardRef<HTMLParagraphElement, ISectionNumberProps>(
    ({ fontSize, number }, ref) => (
      <p
        ref={ref}
        className='map-block__section-title'
        style={{
          fontSize: `${fontSize}rem`,
        }}
      >
        {number}
      </p>
    ),
  ),
);

export default NumberSection;
