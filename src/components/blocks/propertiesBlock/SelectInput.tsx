import { observer } from 'mobx-react-lite';
import { FC } from 'react';
import { ISelectInputProps } from '../../../types/blocks/propertiesBlock/selectInput';



const SelectInput: FC<ISelectInputProps> = observer(({ options, changeEvent, value }) => {
	return (
		<select className='properties-block__select' value={value} onChange={changeEvent}>
			{options.map((option) => (
				<option key={option.id} className='properties-block__option' value={option.id}>
					{option.option}
				</option>
			))}
		</select>
	);
});

export default SelectInput;
