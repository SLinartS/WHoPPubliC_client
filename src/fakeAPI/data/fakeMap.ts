import { IMap } from "../../types/map";

export const fakeMap: IMap = {
	zones: [
		{
			id: 0,
			zoneLetter: 'A',
			sections: [
				{
					id: 0,
					floorsNumber: 7,
					blocks: [
						{ id: 1 },
						{ id: 2 },
						{ id: 3 },
						{ id: 4 },
						{ id: 5 },
						{ id: 6 },
						{ id: 7 },
					],
				},
			],
		},
		{
			id: 1,
			zoneLetter: 'C',
			sections: [
				{
					id: 0,
					floorsNumber: 5,
					blocks: [
						{ id: 1 },
						{ id: 2 },
						{ id: 3 },
						{ id: 4 },
					],
				},
				{
					id: 1,
					floorsNumber: 5,
					blocks: [
						{ id: 1 },
						{ id: 2 },
						{ id: 3 },
						{ id: 4 },
						{ id: 5 },
						{ id: 6 },
						{ id: 7 },
						{ id: 8 },
					],
				},
			],
		},
	],
};