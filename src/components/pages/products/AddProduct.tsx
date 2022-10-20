import { observer } from 'mobx-react-lite';
import { FC } from 'react';
import Button from '../../blocks/Button';
import PropertiesBlock from '../../blocks/PropertiesBlock';
import imagePlaceholder from '../../../assets/images/placeholder.jpg';
import { IProperties } from '../../../types/blocks/propertiesBlock';
import { useRootStore } from '../../../utils/RootStoreProvider/useRootStore';

const AddProduct: FC = observer(() => {
	const { popUpControlStore } = useRootStore();

	const TITLE_BLOCK_PROPERTIES: Array<IProperties> = [{ text: 'Название' }];
	const MAIN_BLOCK_PROPERTIES: Array<IProperties> = [
		{ text: 'Автор' },
		{
			text: 'Категория',
			inputOptions: [
				'Учебная литература (ВУЗ)',
				'Учебная литература (CУЗ)',
				'Художественная литература',
			],
		},
	];
	const SECOND_BLOCK_PROPERTIES: Array<IProperties> = [
		{ text: 'Год издания' },
		{ text: 'Количество товаров' },
	];
	const OTHER_BLOCK_PROPERTIES: Array<IProperties> = [
		{ text: 'Дата печати' },
		{ text: 'Типография' },
		{ text: 'Издательство' },
	];

	function hideAddProductWindowHandler() {
		popUpControlStore.hideAddProductWindow();
	}

	return (
		<div className='add-product'>
			<div className='add-product__header'>
				<h3 className='add-product__title'>Добавить партию товара</h3>
				<Button classes='button--add-product button--add-product-two' text='Добавить' />
				<Button
					classes='button--add-product button--add-product-one'
					text='Отмена'
					onClick={hideAddProductWindowHandler}
				/>
			</div>
			<div className='add-product__content-block'>
				<div className='properties-block properties-block--article-info'>
					<div className='properties-block__block'>
						<p className='properties-block__title'>Артикул</p>
						<input className='properties-block__input' />
						<Button classes='button--add-product' text='Сгенерировать' />
					</div>
				</div>
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
