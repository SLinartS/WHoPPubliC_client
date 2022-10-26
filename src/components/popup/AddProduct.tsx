import { observer } from 'mobx-react-lite';
import { FC, useEffect } from 'react';

import imagePlaceholder from '../../assets/images/placeholder.jpg';
import { IProperties } from '../../types/blocks/propertiesBlock/propertiesBlock';

import { ChangeFieldEvent } from '../../types/popup/popupWindows';
import { addProductFormData } from '../../types/store/addProductForm';

import { useRootStore } from '../../utils/RootStoreProvider/useRootStore';
import PropertiesBlock from '../blocks/propertiesBlock/PropertiesBlock';
import PropertyHeadBlock from '../blocks/propertiesBlock/PropertyHeadBlock';

import WindowHeader from '../blocks/WindowHeader';

const AddProduct: FC = observer(() => {
	const { popUpControlStore, addProductFormStore, productsStore, addAcceptanceTaskFormStore } =
		useRootStore();

	function changeFieldHandler(e: ChangeFieldEvent, fieldName: keyof addProductFormData) {
		addProductFormStore[fieldName] = e.target.value;
	}

	const TITLE_BLOCK_PROPERTIES: Array<IProperties> = [
		{
			text: 'Название',
			changeEvent: (e) => changeFieldHandler(e, 'title'),
			value: addProductFormStore.title,
		},
	];
	const MAIN_BLOCK_PROPERTIES: Array<IProperties> = [
		{
			text: 'Автор',
			changeEvent: (e) => changeFieldHandler(e, 'author'),
			value: addProductFormStore.author,
		},
		{
			text: 'Категория',
			changeEvent: (e) => changeFieldHandler(e, 'category'),
			selectOptions: [
				{ id: 1, option: 'Учебная литература (ВУЗ)' },
				{ id: 2, option: 'Учебная литература (CУЗ)' },
				{ id: 3, option: 'Художественная литература' },
			],
			value: addProductFormStore.category,
		},
	];
	const SECOND_BLOCK_PROPERTIES: Array<IProperties> = [
		{
			text: 'Год издания',
			changeEvent: (e) => changeFieldHandler(e, 'yearOfPublication'),
			value: addProductFormStore.yearOfPublication,
		},
		{
			text: 'Количество товаров',
			changeEvent: (e) => changeFieldHandler(e, 'number'),
			value: addProductFormStore.number,
		},
	];
	const OTHER_BLOCK_PROPERTIES: Array<IProperties> = [
		{
			text: 'Дата печати',
			changeEvent: (e) => changeFieldHandler(e, 'printDate'),
			value: addProductFormStore.printDate,
		},
		{
			text: 'Типография',
			changeEvent: (e) => changeFieldHandler(e, 'printingHouse'),
			value: addProductFormStore.printingHouse,
		},
		{
			text: 'Издательство',
			changeEvent: (e) => changeFieldHandler(e, 'publishingHouse'),
			value: addProductFormStore.publishingHouse,
		},
	];

	function hideAddProductWindowHandler() {
		popUpControlStore.hideAddProductWindow();
		popUpControlStore.showAddAcceptanceTaskWindow();
	}

	function addProductHandler() {
		productsStore.addProduct(
			addProductFormStore.formData,
			addAcceptanceTaskFormStore.title,
			'1',
		);
		
	}

	useEffect(() => {
		if (productsStore.statusAddProduct === 'done') {
			hideAddProductWindowHandler()
			productsStore.statusAddProduct = 'pending';
			productsStore.statusGetProductsOfTask = 'pending';
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [productsStore.statusAddProduct]);

	return (
		<div className='add-product'>
			<WindowHeader
				text='Добавить партию товара'
				closeWindowEvent={hideAddProductWindowHandler}
				actionEvent={addProductHandler}
			/>
			<div className='add-product__content-block'>
				<PropertyHeadBlock
					property={{
						text: 'Артикул',
						changeEvent: (e) => changeFieldHandler(e, 'article'),
						value: addProductFormStore.article,
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
