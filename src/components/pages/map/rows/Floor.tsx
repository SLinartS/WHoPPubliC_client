import React, { FC, ReactNode } from 'react';
import { ISectionFloorComponent } from '../../../../types/map';
import BlockRow from './BlockRow';
import HeadRow from './HeadFloor';

const Row: FC<ISectionFloorComponent> = ({ number, isHeadRow, columnsNumber}) => {

	function rowType(columnsNumber: number) {
		let rows: Array<ReactNode> = [];
		if (isHeadRow) {
			for (let i = 0; i <= columnsNumber; i++) {
				rows.push(<HeadRow key={i} number={i} />);
			}
		} else {
			for (let i = 0; i <= columnsNumber; i++) {
				if (i === 0) {
					rows.push(<HeadRow key={number} number={number} />);
				} else {
					rows.push(<BlockRow key={Math.random()}/>);
				}
			}
		}
		return rows;
	}

	return (
		<div
			className='map__row'
			style={{ gridTemplateColumns: `repeat(${columnsNumber + 1}, 5rem` }}
		>
			{rowType(columnsNumber)}
		</div>
	);
};

export default Row;
