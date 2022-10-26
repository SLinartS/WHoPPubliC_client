import { makeAutoObservable } from 'mobx';
import {
	addAcceptanceTaskFormDataArrays,
	addAcceptanceTaskFormDataFields,
} from '../../types/store/addAcceptanceTaskForm';

import RootStore from '../root';

export class AddAcceptanceTaskFormStore {
	private _rootStore!: RootStore;

	private set rootStore(rootStore: RootStore) {
		this._rootStore = rootStore;
	}

	constructor(rootStore: RootStore) {
		makeAutoObservable(this, {});
		this.rootStore = rootStore;
	}

	private _formDataField: addAcceptanceTaskFormDataFields = {
		title: '',
		dateStart: '',
		dateEnd: '',
		userId: '',
	};

	private _formDataArrays: addAcceptanceTaskFormDataArrays = {
		products: [],
		startPoints: [],
		endPoints: [],
	};

	// Getters ALL FORM DATA
	public get formDataField() {
		return this._formDataField;
	}
	public get formDataArrays() {
		return this._formDataArrays;
	}

	// Getters FIELDS
	public get title() {
		return this._formDataField.title;
	}
	public get dateStart() {
		return this._formDataField.dateStart;
	}
	public get dateEnd() {
		return this._formDataField.dateEnd;
	}
	public get userId() {
		return this._formDataField.userId;
	}

	// Getters ARRAYS
	public get products() {
		return this._formDataArrays.products;
	}
	public get startPoints() {
		return this._formDataArrays.startPoints;
	}
	public get endPoints() {
		return this._formDataArrays.endPoints;
	}

	// Setters FIELDS
	public set title(title: string) {
		this._formDataField.title = title;
	}
	public set dateStart(dateStart: string) {
		this._formDataField.dateStart = dateStart;
	}
	public set dateEnd(dateEnd: string) {
		this._formDataField.dateEnd = dateEnd;
	}
	public set userId(userId: string) {
		this._formDataField.userId = userId;
	}

	// Adding and removing values from ARRAYS
	// Add values
	public addProductId(productId: string) {
		this._formDataArrays.products.push(productId);
	}
	public addStartPointId(startPointId: string) {
		this._formDataArrays.startPoints.push(startPointId);
	}
	public addEndPointId(endPointTitle: string) {
		this._formDataArrays.endPoints.push(endPointTitle);
	}

	// Remove values
	public removeProductId(productId: string) {
		this._formDataArrays.products = this._formDataArrays.products.filter(
			(id) => id !== productId,
		);
	}
	public removeStartPoint(startPointid: string) {
		this._formDataArrays.startPoints = this._formDataArrays.startPoints.filter(
			(id) => id !== startPointid,
		);
	}
	public removeEndPoint(endPointTitle: string) {
		this._formDataArrays.endPoints = this._formDataArrays.endPoints.filter(
			(title) => title !== endPointTitle,
		);
	}
}
