import { observer } from 'mobx-react-lite';
import { FC } from 'react';

import imagePlaceholder from '../../assets/images/placeholder.jpg';
import { IProperties } from '../../types/blocks/propertiesBlock';
import { addProductFormData } from '../../types/store';
import { useRootStore } from '../../utils/RootStoreProvider/useRootStore';
import PropertiesBlock from '../blocks/PropertiesBlock';
import PropertyHeadBlock from '../blocks/PropertyHeadBlock';
import WindowHeader from '../blocks/WindowHeader';

type ChangeFieldEvent = React.ChangeEvent<HTMLInputElement | HTMLSelectElement>;

const AddProduct: FC = observer(() => {
	const { popUpControlStore, addProductFormStore } = useRootStore();

	function changeBlockHandler(e: ChangeFieldEvent, fieldName: keyof addProductFormData) {
		addProductFormStore[fieldName] = e.target.value;
	}

	const TITLE_BLOCK_PROPERTIES: Array<IProperties> = [
		{ text: 'Название', changeEvent: (e) => changeBlockHandler(e, 'title') },
	];
	const MAIN_BLOCK_PROPERTIES: Array<IProperties> = [
		{ text: 'Автор', changeEvent: (e) => changeBlockHandler(e, 'author') },
		{
			text: 'Категория',
			changeEvent: (e) => changeBlockHandler(e, 'category'),
			selectOptions: [
				{ id: 1, option: 'Учебная литература (ВУЗ)' },
				{ id: 2, option: 'Учебная литература (CУЗ)' },
				{ id: 3, option: 'Художественная литература' },
			],
		},
	];
	const SECOND_BLOCK_PROPERTIES: Array<IProperties> = [
		{
			text: 'Год издания',
			changeEvent: (e) => changeBlockHandler(e, 'yearOfPublication'),
		},
		{ text: 'Количество товаров', changeEvent: (e) => changeBlockHandler(e, 'number') },
	];
	const OTHER_BLOCK_PROPERTIES: Array<IProperties> = [
		{ text: 'Дата печати', changeEvent: (e) => changeBlockHandler(e, 'printDate') },
		{ text: 'Типография', changeEvent: (e) => changeBlockHandler(e, 'printingHouse') },
		{
			text: 'Издательство',
			changeEvent: (e) => changeBlockHandler(e, 'publishingHouse'),
		},
	];

	function hideAddProductWindowHandler() {
		popUpControlStore.hideAddProductWindow();
		popUpControlStore.showAddAcceptanceTaskWindow();
	}

	return (
		<div className='add-product'>
			<WindowHeader
				text='Добавить партию товара'
				closeWindowEvent={hideAddProductWindowHandler}
			/>
			<div className='add-product__content-block'>
				<PropertyHeadBlock
					property={{
						text: 'Артикул',
						changeEvent: (e) => changeBlockHandler(e, 'article'),
					}}
				/>

				<PropertiesBlock
					classes='properties-block--title-info'
					properties={TITLE_BLOCK_PROPERTIES}
				/>
				<PropertiesBlock
					classes='properties-block--main-info'
					properties={MAIN_BLOCK_PROPERTIES}
				/>
				<PropertiesBlock
					classes='properties-block--second-info'
					properties={SECOND_BLOCK_PROPERTIES}
				/>
				<PropertiesBlock
					classes='properties-block--other-info'
					properties={OTHER_BLOCK_PROPERTIES}
				/>
				<div className='add-product__photo-block'>
					<img src={imagePlaceholder} alt='' className='add-product__photo' />
					<p className='add-product__photo-text'>Фотография товара</p>
				</div>
				<div className='add-product__empty-block'></div>
			</div>
		</div>
	);
});

export default AddProduct;
