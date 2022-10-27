import { observer } from 'mobx-react-lite';
import { FC } from 'react';
import { IPropertiesBlockTitleProps } from './types';


const FormTitle: FC<IPropertiesBlockTitleProps> = observer(({ additionalСlasses, text }) => {
	return <p className={'properties-block__title ' + additionalСlasses}>{text}</p>;
});

export default FormTitle;
