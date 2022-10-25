import { FC } from 'react';
import { IPropertiesBlockProps } from '../../types/blocks/propertiesBlock';
import SelectInput from './SelectInput';

const PropertiesBlock: FC<IPropertiesBlockProps> = ({ classes, properties }) => {
	return (
		<div className={'properties-block ' + classes}>
			{properties.map((property) => {
				return (
					<div className='properties-block__block'>
						<p className='properties-block__title'>{property.text}</p>
						{property.selectOptions ? (
							<SelectInput options={property.selectOptions} changeEvent={property.changeEvent}/>
						) : (
							<input
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
