import React, { Component } from 'react';

var moment = require('moment');


class Table extends Component {	
	constructor(){
		super();
		this.state = {
			am8: '',
			am10: '',
			pm4c: '',
			pm4w: '',
			pm7c: '',
			pm7w: '',
			slots: []
		}
	}



	componentDidMount() {
		//get table data
		const setSlot = (entry) => {
			switch(entry.slot){
				case 'am8':
					this.setState({am8: entry.username});
					break;
				case 'am10':
					this.setState({am10: entry.username});
					break;
				case 'pm4c':
					this.setState({pm4c: entry.username});
					break;
				case 'pm4w':
					this.setState({pm4w: entry.username});
					break;
				case 'pm7c':
					this.setState({pm7c: entry.username});
					break;
				case 'pm7w':
					this.setState({pm7w: entry.username});
					break;
				default:
					return;
			}
		}

		fetch('http://localhost:3001/dayview', {
      method: 'POST',
      body: JSON.stringify({date: moment(this.props.date).format()}),
      headers: {'Content-Type': 'application/json'},
    })
    .then(response => response.json())
    .then(data => {
    	data.forEach(entry => {
    		setSlot(entry);
    	})
    })
    .catch(err => {
    	throw err;
    })
		
	}
	
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
					fetch('http://localhost:3001/bookslot', {
			      method: 'DELETE',
			      body: JSON.stringify({
			      	date: moment(this.props.date).format(),
			      	slot: e.target.id,
			      	username: this.props.username
			      }),
			      headers: {'Content-Type': 'application/json'},
			    })
			    .then(response => response.json())
			    .then(data => {
			    	console.log(data);
			    })
			    .catch(err => {
			    	throw err;
			    })
				}
			}
		} else if(window.confirm('Are you sure you want to select this slot?')) {
			e.target.appendChild(document.createTextNode(this.props.username));
			e.target.classList.toggle("table-light");	
			e.target.classList.toggle("table-success");

			fetch('http://localhost:3001/bookslot', {
	      method: 'PUT',
	      body: JSON.stringify({
	      	date: moment(this.props.date).format(),
	      	slot: e.target.id,
	      	username: this.props.username
	      }),
	      headers: {'Content-Type': 'application/json'},
	    })
	    .then(response => response.json())
	    .then(data => {
	    	console.log(data);
	    })
	    .catch(err => {
	    	throw err;
	    })
		}
		
	}
	
	render() {
		/*if(this.state.slots.length === 0) {
			return (
				<div>Loading</div>
			);
		} 
		else {*/
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
								<td id="am8" colSpan="2" className={this.state.am8 ? "table-success" : "table-light"} onClick={this.fillCell}>{this.state.am8}</td>
							</tr>
							<tr>
								<th scope="row">10am - 12pm</th>
								<td id="am10" colSpan="2" className={this.state.am10 ? "table-success" : "table-light"} onClick={this.fillCell}>{this.state.am10}</td>
							</tr>
							<tr className="thead-light">
								<th scope="row"></th>
								<th scope="row">Cardio</th>
								<th scope="row">Weight</th>
							</tr>
							<tr>
								<th scope="row">4pm - 7pm</th>
								<td id="pm4c" className={this.state.pm4c ? "table-success" : "table-light"} onClick={this.fillCell}>{this.state.pm4c}</td>
								<td id="pm4w" className={this.state.pm4w ? "table-success" : "table-light"} onClick={this.fillCell}>{this.state.pm4w}</td>
							</tr>
							<tr>
								<th scope="row">7pm - 10:30pm</th>
								<td id="pm7c" className={this.state.pm7c ? "table-success" : "table-light"} onClick={this.fillCell}>{this.state.pm7c}</td>
								<td id="pm7w" className={this.state.pm7w ? "table-success" : "table-light"} onClick={this.fillCell}>{this.state.pm7w}</td>
							</tr>
						</tbody>
					</table>
				</div>
			);
		//}
	}
}

export default Table;
