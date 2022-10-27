import { observer } from 'mobx-react-lite';
import { FC } from 'react';

const FormFieldPoint: FC = observer(() => {
	return <button className='properties-block__add-point'>+</button>;
});

export default FormFieldPoint;
