import { observer } from 'mobx-react-lite';
import { FC } from 'react';
import { IPropertyHeadBlockProps } from '../../../types/blocks/propertiesBlock/propertiesBlock';

import Button from '../Button';


const PropertyHeadBlock: FC<IPropertyHeadBlockProps> = observer(({ classes, property,  }) => {
	return (
		<div className='properties-block properties-block--article-info'>
			<div className='properties-block__block'>
				<p className='properties-block__title properties-block__title--big'>
					{property.text}
				</p>
				<input className='properties-block__input properties-block__input--big' value={property.value} onChange={property.changeEvent}/>
				<Button classes='button--window-header' text='Сгенерировать' />
			</div>
		</div>
	);
});

export default PropertyHeadBlock;
