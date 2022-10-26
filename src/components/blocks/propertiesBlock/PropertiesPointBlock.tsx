import { observer } from 'mobx-react-lite';
import { FC } from 'react';
import { IPropertiesOfPointBlockProps } from '../../../types/blocks/propertiesBlock/propertiesOfPointBlock';




const PropertiesPointBlock: FC<IPropertiesOfPointBlockProps> = observer(({ classes, properties }) => {
	return (
		<div className={'properties-block ' + classes}>
			{properties.map((property) => {
				return (
					<div key={property.text} className='properties-block__block'>
						<p className='properties-block__title'>{property.text}</p>
						<button className='properties-block__add-point'>+</button>
					</div>
				);
			})}
		</div>
	);
});

export default PropertiesPointBlock;
