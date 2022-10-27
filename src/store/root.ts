import { configure } from 'mobx';
import { TasksStore } from './tasks';
import { MapStore } from './map';
import { ProductsStore } from './products';
import { PopUpControlStore } from './popUpControl';
import { AddTaskFormStore } from './form/addTaskForm';
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

	public addTaskFormStore: AddTaskFormStore;
	public addProductFormStore: AddProductFormStore;

	private constructor() {
		this.tasksStore = new TasksStore(this);
		this.mapStore = new MapStore(this);
		this.productsStore = new ProductsStore(this);
		this.popUpControlStore = new PopUpControlStore(this);

		this.addTaskFormStore = new AddTaskFormStore(this);
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
