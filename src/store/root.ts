import { configure } from 'mobx';
import { TasksStore } from './tasks';
import { MapStore } from './map';
import { ProductsStore } from './products';
import { PopUpControlStore } from './popUpControl';
import { AddAcceptanceTaskFormStore } from './form/addAcceptanceTaskForm';
import { AddProductFormStore } from './form/addProductForm';

configure({
	enforceActions: 'always',
});

class RootStore {
	private static instance: RootStore;

	public tasksStore: TasksStore;
	public mapStore: MapStore;
	public productsStore: ProductsStore;
	public popUpControlStore: PopUpControlStore;

	public addAcceptanceTaskFormStore: AddAcceptanceTaskFormStore;
	public addProductFormStore: AddProductFormStore;

	private constructor() {
		this.tasksStore = new TasksStore(this);
		this.mapStore = new MapStore(this);
		this.productsStore = new ProductsStore(this);
		this.popUpControlStore = new PopUpControlStore(this);

		this.addAcceptanceTaskFormStore = new AddAcceptanceTaskFormStore(this);
		this.addProductFormStore = new AddProductFormStore(this);
	}

	public static getInstance(): RootStore {
		if (!RootStore.instance) {
			RootStore.instance = new RootStore();
		}
		return RootStore.instance;
	}
}

export default RootStore;
