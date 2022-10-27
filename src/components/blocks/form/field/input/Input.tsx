import { observer } from 'mobx-react-lite';
import { FC } from 'react';
import { IFormFieldInputProps } from './type';

const FormFieldInput: FC<IFormFieldInputProps> = observer(
	({ additionalСlasses, value, changeEvent }) => {
		return (
			<input
				value={value}
				className={'properties-block__input ' + additionalСlasses}
				onChange={changeEvent}
			/>
		);
	},
);

export default FormFieldInput;
