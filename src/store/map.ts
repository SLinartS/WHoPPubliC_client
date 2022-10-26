import { makeAutoObservable } from 'mobx';

import RootStore from './root';


import extendAxios from '../utils/extendAxios';
import { AxiosResponse } from 'axios';
import { TStatus } from '../types/store/store';
import { TMap } from '../components/pages/map/types';

export class MapStore {
	private _rootStore!: RootStore;

	private set rootStore(rootStore: RootStore) {
		this._rootStore = rootStore;
	}

	constructor(rootStore: RootStore) {
		makeAutoObservable(this, {});
		this.rootStore = rootStore;
	}

	public status: TStatus = 'pending';
	public mapData: TMap = [];

	public *getMap() {
		try {
			const response: AxiosResponse<TMap> = yield extendAxios.get<TMap>('map');
			this.mapData = response.data;
			this.status = 'done';
		} catch (error) {
			console.log(error);
			this.status = 'error';
		}
	}
}
