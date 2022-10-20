import { makeAutoObservable } from 'mobx';

import RootStore from './root';
import { TStatus } from '../types/store';
import { TMap } from '../types/map';

import { getFakeMap } from '../fakeAPI/fakeAPI';

export class MapStore {
	private rootStore: RootStore;

	constructor(rootStore: RootStore) {
		makeAutoObservable(this, {});
		this.rootStore = rootStore;
	}

	public status: TStatus = 'pending';
	public mapData: TMap = [];

	public *getMap() {
		try {
			console.log('request to the server...', '| Map');
			const data: TMap = yield getFakeMap();
			this.mapData = data;
			this.status = 'done';
		} catch (error) {
			this.status = 'error';
		}
	}
}
