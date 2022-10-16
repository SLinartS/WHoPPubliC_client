import React from 'react';

const TableHeader = () => {
	return (
		<>
			<div className='table__block table__block--header'>
				<p className='table__text'> №</p>
			</div>
			<div className='table__block table__block--header'>
				<p className='table__text'>ID</p>
			</div>
			<div className='table__block table__block--header'>
				<p className='table__text'>Осталось времени</p>
			</div>
			<div className='table__block table__block--header'>
				<p className='table__text'>Дата начала</p>
			</div>
			<div className='table__block table__block--header'>
				<p className='table__text'>Дата окончания</p>
			</div>
			<div className='table__block table__block--header'>
				<p className='table__text'>Логин оператора</p>
			</div>
		</>
	);
};

export default TableHeader;
