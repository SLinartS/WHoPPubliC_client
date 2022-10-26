import { observer } from 'mobx-react-lite';
import { FC } from 'react';
import { PropertiesBlockLayoutProps } from './types';

const FormLayout: FC<PropertiesBlockLayoutProps> = observer(({ additionalСlasses, children }) => {
	return <div className={'properties-block ' + additionalСlasses}>{children}</div>;
});

export default FormLayout;
