import { observer } from 'mobx-react-lite';
import { FC } from 'react';
import { ISelectInputProps } from '../../types/blocks/selectInput';

const SelectInput: FC<ISelectInputProps> = observer(({ options }) => {
	return (
		<select className='properties-block__select'>
			{options.map((option) => (
				<option className='properties-block__option' value={option}>{option}</option>
			))}
		</select>
	);
});

export default SelectInput;
