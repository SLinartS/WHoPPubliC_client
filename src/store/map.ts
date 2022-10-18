import { makeAutoObservable } from 'mobx';

import RootStore from './root';
import { TypeStatus } from '../types/store';
import { IMap } from '../types/map';

import { getFakeMap } from '../fakeAPI/fakeAPI';

export class MapStore {
	private rootStore: RootStore;

	constructor(rootStore: RootStore) {
		makeAutoObservable(this, {});
		this.rootStore = rootStore;
	}

	public status: TypeStatus = 'pending';
	public map: IMap = {
		zones: [],
	};

	public *getMap() {
		try {
			console.log('request to the server...', '| Map');
			const data: IMap = yield getFakeMap();
			this.map = data;
			this.status = 'done';
		} catch (error) {
			this.status = 'error';
		}
	}
}
