import { TMap } from '../types/map';
import { TProductsData } from '../types/products';
import { TAcceptanceTasks, TShipmentTasks } from '../types/tasks';
import { fM } from './data/fakeMap';
import { fP } from './data/fakeProducts';
import { fATL } from './data/fakeTaskList';
import { fSTL } from './data/fakeTaskList';

const loadingSpeed: number = 1000;

// <---------- TASKS ---------->
export async function getFakeAcceptanceTasks() {
	return new Promise<TAcceptanceTasks>((resolve) => {
		setTimeout(() => resolve(fATL), loadingSpeed);
	});
}

export async function getFakeShipmentTasks() {
	return new Promise<TShipmentTasks>((resolve) => {
		setTimeout(() => resolve(fSTL), loadingSpeed);
	});
}

export async function deleteFakeAcceptanceTask(id: string) {
	return new Promise<Object>((resolve) => {
		setTimeout(() => {
			fATL.data = fATL.data.filter((value) => value.id !== id);
			resolve({ response: "It's OK" });
		}, loadingSpeed);
	});
}

// <---------- MAP ---------->
export async function getFakeMap() {
	return new Promise<TMap>((resolve) => {
		setTimeout(() => resolve(fM.zones), loadingSpeed);
	});
}

// <---------- PRODUCTS ---------->
export async function getFakeProducts() {
	return new Promise<TProductsData>((resolve) => {
		setTimeout(() => resolve(fP), loadingSpeed);
	});
}
