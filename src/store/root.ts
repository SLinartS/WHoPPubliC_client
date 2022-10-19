import { configure } from 'mobx';
import { TasksStore } from './tasks';
import { MapStore } from './map';
import { ProductsStore } from './products';

configure({
	enforceActions: 'always',
});

class RootStore {
	private static instance: RootStore;

	public tasksStore: TasksStore;
	public mapStore: MapStore;
	public productsStore: ProductsStore;

	private constructor() {
		this.tasksStore = new TasksStore(this);
		this.mapStore = new MapStore(this);
		this.productsStore = new ProductsStore(this);
	}

	public static getInstance(): RootStore {
		if (!RootStore.instance) {
			RootStore.instance = new RootStore();
		}
		return RootStore.instance;
	}
}

export default RootStore;
