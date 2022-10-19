import { TMap } from '../types/map';
import { TAcceptanceTasks, TShipmentTasks } from '../types/tasks';
import { fakeMap } from './data/fakeMap';
import { fTL } from './data/fakeTaskList';

const loadingSpeed: number = 1000;

// <---------- TASKS ---------->
export async function getFakeAcceptanceTasks() {
	return new Promise<TAcceptanceTasks>((resolve) => {
		setTimeout(() => resolve(fTL.fakeAcceptanceTasks), loadingSpeed);
	});
}

export async function getFakeShipmentTasks() {
	return new Promise<TShipmentTasks>((resolve) => {
		setTimeout(() => resolve(fTL.fakeShipmentTasks), loadingSpeed);
	});
}

export async function deleteFakeAcceptanceTask(id: string) {
	return new Promise<Object>((resolve) => {
		setTimeout(() => {
			fTL.fakeAcceptanceTasks = fTL.fakeAcceptanceTasks.filter(
				(value) => value.id !== id,
			);
			resolve({ response: "It's OK" });
		}, loadingSpeed);
	});
}

// <---------- MAP ---------->
export async function getFakeMap() {
	return new Promise<TMap>((resolve) => {
		setTimeout(() => resolve(fakeMap), loadingSpeed);
	});
}
