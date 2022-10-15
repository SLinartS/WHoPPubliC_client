import React, { FC, ReactNode } from 'react';
import {IMapRowData } from '../../../../types/map';
import BlockRow from './BlockRow';
import HeadRow from './HeadRow';

const Row: FC<IMapRowData> = ({ number, columnsNumber, isHeadRow }) => {
	function rowType() {
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
					rows.push(<BlockRow />);
				}
			}
		}
		return rows;
	}

	return <div className='map__row' style={{gridTemplateColumns: `repeat(${columnsNumber+1}, 5rem`}}>{rowType()}</div>;
};

export default Row;
