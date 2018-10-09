import React, { Component } from 'react';
import Table from './Table.js';

class TableList extends Component {
	render() {
		console.log("rendering tableList");
		const {date, username, shiftDate} = this.props;
		
		let rows = [];
		let incDate = date;
		for (var i = 0; i < 7; i++) {
			rows.push(<Table date={incDate} username={username} key={i} />);
			incDate = shiftDate(incDate, 1);
		}

		return (
			<div>
			{rows}
			</div>
		);
	}
}

export default TableList;
