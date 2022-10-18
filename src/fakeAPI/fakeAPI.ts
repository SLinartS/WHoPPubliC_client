import { IMap } from '../types/map';
import { IAcceptanceTasksList, IShipmentTasksList } from '../types/tasks';
import { fakeMap } from './data/fakeMap';
import { TL } from './data/fakeTaskList';

const loadingSpeed: number = 1000;

export async function getFakeAcceptanceTasks() {
	return new Promise<IAcceptanceTasksList>((resolve) => {
		setTimeout(() => resolve(TL.fakeAcceptanceTasks), loadingSpeed);
	});
}

export async function getFakeShipmentTasks() {
	return new Promise<IShipmentTasksList>((resolve) => {
		setTimeout(() => resolve(TL.fakeShipmentTasks), loadingSpeed);
	});
}

export async function deleteFakeAcceptanceTask(id: string) {
	return new Promise<Object>((resolve) => {
		setTimeout(() => {
			TL.fakeAcceptanceTasks = TL.fakeAcceptanceTasks.filter(
				(value) => value.id !== id,
			);
			resolve({ response: "It's OK" });
		}, loadingSpeed);
	});
}

export async function getFakeMap() {
	return new Promise<IMap>((resolve) => {
		setTimeout(() => resolve(fakeMap), loadingSpeed);
	});
}
