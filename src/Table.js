import React, { Component } from 'react';

class Table extends Component {	

	getDate = (fullDate) => {
		return fullDate.getDate() + "/" + (fullDate.getMonth()+1) + "/" + fullDate.getFullYear();
	}
	
	getDay = (fullDate) => {
		const day = fullDate.getDay();
		switch(day){
			case 0:
				return "Sunday";
			case 1:
				return "Monday";
			case 2:
				return "Tuesday";
			case 3:
				return "Wednesday";
			case 4:
				return "Thursday";
			case 5:
				return "Friday";
			case 6:
				return "Saturday";
			default:
				return "";
		}
	}
	
	fillCell = (e) => {
		if(e.target.classList.contains("table-success")) {
			if(e.target.childNodes[0].textContent.indexOf(this.props.username) > -1) { //basically if cell.innerHTML = username
				if(window.confirm('Cancel slot?')){
					e.target.removeChild(e.target.childNodes[0]);
					e.target.classList.toggle("table-light");	
					e.target.classList.toggle("table-success");
				}
			}
		} else if(window.confirm('Are you sure you want to select this slot?')) {
			e.target.appendChild(document.createTextNode(this.props.username));
			e.target.classList.toggle("table-light");	
			e.target.classList.toggle("table-success");
		}
		
	}
	
	render() {
		return (
			<div>
				<h3>{this.getDay(this.props.date)}, {this.getDate(this.props.date)}</h3>
				<table className="table table-bordered">
					<thead className="thead-light">
						<tr>
							<th scope="col">Time</th>
							<th scope="col" colSpan="2">Slots</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<th scope="row">8am - 10am</th>
							<td colSpan="2" className="table-light" onClick={this.fillCell}></td>
						</tr>
						<tr>
							<th scope="row">10am - 12pm</th>
							<td colSpan="2" className="table-light" onClick={this.fillCell}></td>
						</tr>
						<tr className="thead-light">
							<th scope="row"></th>
							<th scope="row">Cardio</th>
							<th scope="row">Weight</th>
						</tr>
						<tr>
							<th scope="row">4pm - 7pm</th>
							<td className="table-light" onClick={this.fillCell}></td>
							<td className="table-light" onClick={this.fillCell}></td>
						</tr>
						<tr>
							<th scope="row">7pm - 10:30pm</th>
							<td className="table-light" onClick={this.fillCell}></td>
							<td className="table-light" onClick={this.fillCell}></td>
						</tr>
					</tbody>
				</table>
			</div>
		);
	}
}

export default Table;
