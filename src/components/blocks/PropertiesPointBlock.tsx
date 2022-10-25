import { observer } from 'mobx-react-lite';
import { FC } from 'react';
import { IPropertiesPointBlockProps } from '../../types/blocks/propertiesBlock';

const PropertiesPointBlock: FC<IPropertiesPointBlockProps> = observer(({ classes, properties }) => {
	return (
		<div className={'properties-block ' + classes}>
			{properties.map((property) => {
				return (
					<div className='properties-block__block'>
						<p className='properties-block__title'>{property.text}</p>
						<button className='properties-block__add-point'>+</button>
					</div>
				);
			})}
		</div>
	);
});

export default PropertiesPointBlock;
