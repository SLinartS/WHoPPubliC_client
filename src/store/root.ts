import { configure } from 'mobx';
import { TasksStore } from './tasks';
import { MapStore } from './map';

configure({
	enforceActions: 'always',
});

class RootStore {
	private static instance: RootStore;

	public tasksStore: TasksStore;
	public mapStore: MapStore;

	private constructor() {
		this.tasksStore = new TasksStore(this);
		this.mapStore = new MapStore(this);
	}

	public static getInstance(): RootStore {
		if (!RootStore.instance) {
			RootStore.instance = new RootStore();
		}
		return RootStore.instance;
	}

}

export default RootStore;
