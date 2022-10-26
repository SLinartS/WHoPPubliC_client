import { FC } from 'react';
import { IPropertiesBlockProps } from '../../../types/blocks/propertiesBlock/propertiesBlock';

import SelectInput from './SelectInput';



const PropertiesBlock: FC<IPropertiesBlockProps> = ({ classes, properties }) => {
	return (
		<div className={'properties-block ' + classes}>
			{properties.map((property) => {
				return (
					<div key={property.text} className='properties-block__block'>
						<p className='properties-block__title'>{property.text}</p>
						{property.selectOptions ? (
							<SelectInput
								value={property.value}
								options={property.selectOptions}
								changeEvent={property.changeEvent}
							/>
						) : (
							<input
								value={property.value}
								className='properties-block__input'
								onChange={property.changeEvent}
							/>
						)}
					</div>
				);
			})}
		</div>
	);
};

export default PropertiesBlock;
