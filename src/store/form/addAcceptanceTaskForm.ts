import { makeAutoObservable } from 'mobx';
import { addAcceptanceTaskFormData } from '../../types/store';
import RootStore from '../root';

export class AddAcceptanceTaskFormStore {
	private rootStore: RootStore;

	constructor(rootStore: RootStore) {
		makeAutoObservable(this, {});
		this.rootStore = rootStore;
	}

	public formData: addAcceptanceTaskFormData = {
		title: '',
		dateStart: '',
		dateEnd: '',
		operatorLogin: '',
		productIds: [],
		startPointIds: [],
		endPointIds: [],
	};

	// Getters
	public get title() {
		return this.formData.title;
	}
	public get dateStart() {
		return this.formData.dateStart;
	}
	public get dateEnd() {
		return this.formData.dateEnd;
	}
	public get operatorLogin() {
		return this.formData.operatorLogin;
	}
	public get productIds() {
		return this.formData.productIds;
	}
	public get startPointIds() {
		return this.formData.startPointIds;
	}
	public get endPointIds() {
		return this.formData.endPointIds;
	}

	// Setters
	public set title(title: string) {
		this.formData.title = title;
	}
	public set dateStart(dateStart: string) {
		this.formData.dateStart = dateStart;
	}
	public set dateEnd(dateEnd: string) {
		this.formData.dateEnd = dateEnd;
	}
	public set operatorLogin(operatorLogin: string) {
		this.formData.operatorLogin = operatorLogin;
	}

	// Adding and removing values from arrays
	// Add values
	public addProductId(productId: number) {
		this.formData.productIds.push(productId);
	}
	public addStartPointId(startPointId: number) {
		this.formData.startPointIds.push(startPointId);
	}
	public addEndPointId(endPointTitle: string) {
		this.formData.endPointIds.push(endPointTitle);
	}

	// Remove values
	public removeProductId(productId: number) {
		this.formData.productIds = this.formData.productIds.filter((id) => id !== productId);
	}
	public removeStartPoint(startPointid: number) {
		this.formData.startPointIds = this.formData.startPointIds.filter(
			(id) => id !== startPointid,
		);
	}
	public removeEndPoint(endPointTitle: string) {
		this.formData.endPointIds = this.formData.endPointIds.filter(
			(title) => title !== endPointTitle,
		);
	}
}
