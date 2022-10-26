import { observer } from 'mobx-react-lite';
import { FC } from 'react';
import FormTitle from '../title/Title';
import { IFormBlockProps } from './types';

const FormBlock: FC<IFormBlockProps> = observer(
	({ additionalTitleBlockClasses, titleText, children }) => {
		return (
			<div className='properties-block__block'>
				<FormTitle text={titleText} additionalСlasses={additionalTitleBlockClasses} />
				{children}
			</div>
		);
	},
);

export default FormBlock;
