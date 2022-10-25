import { makeAutoObservable } from 'mobx';

import RootStore from './root';
import { TStatus } from '../types/store';
import { TMap } from '../types/map';

import extendAxios from '../utils/extendAxios';
import { AxiosResponse } from 'axios';

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
			const response: AxiosResponse<TMap> = yield extendAxios.get<TMap>('map');
			this.mapData = response.data;
			this.status = 'done';
		} catch (error) {
			console.log(error);
			this.status = 'error';
		}
	}
}
