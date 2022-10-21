export type TStatus = 'pending' | 'done' | 'error';

export interface IAddTaskWindow {
	status: boolean;
	type: TTypesAddTaskWindow;
}

export type TTypesAddTaskWindow = 'unset' | 'acceptance' | 'shipment';
