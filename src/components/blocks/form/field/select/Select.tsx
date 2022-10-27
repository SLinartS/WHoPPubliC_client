import { observer } from 'mobx-react-lite';
import { FC } from 'react';
import { ISelectFiledInputProps } from './types';


const FormFieldSelect: FC<ISelectFiledInputProps> = observer(({ options, changeEvent, value }) => {
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

export default FormFieldSelect;
