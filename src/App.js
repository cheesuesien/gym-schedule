import React, { Component } from 'react';
import './App.css';
import Input from './Input.js';
import DateInput from './DateInput.js';
import Table from './Table.js';
import TableList from './TableList.js';
import Signin from './Signin.js';
import Navigation from './Navigation.js';

class App extends Component {
	constructor() {
		super();
		const today = new Date();
		this.state = {
			viewBy: "Day",
			date: today,
			week: 1, //TODO: set limits to the week. can only go up to 4 or 5.
			isSignedIn: false,
			user: {
				username: "css",
				email: "css.gmail.com",
			}
		}
	}
	
	
	onViewChange = (input) => {
		const tempDate = new Date();
		if (this.state.viewBy === "Day") //which means changing to week soon
		{
			console.log("changing to week");
			console.log(this.getWeek(tempDate));
			this.setState({week: this.getWeek(tempDate)});
		}
		this.setState({date: tempDate}); //reset date to today
		this.setState({viewBy: input});
		console.log("Viewby changed");
	}
	
	getWeek = (date) => {
		let tempDate = date;
		while (tempDate.getDay() !== 1){
			console.log("day:", tempDate.getDay());
			console.log("date:", tempDate.getDate());
			tempDate.setDate(tempDate.getDate()-1);
		}
		return Math.ceil((tempDate.getDate()-1)/7)+1;
	}
	
	onDateChange = (input) => {
		this.setState({date: input});
		console.log("date changed");
	}
	
	onWeekChange = (input) => {
		const prevState = this.state.week;
		if (input !== prevState) {
			this.setState({date: this.shiftDate(this.state.date, 7*(input-prevState))})
		}
		this.setState({week: input});
		
		console.log("week changed");
	}
	
	shiftDate = (today, increment) => {
		let tomorrow = new Date(today);
		tomorrow.setDate(today.getDate() + increment);
		return tomorrow;
	}
	
	signInOut = (isSignedIn) => {
		if (isSignedIn) {
			this.setState({isSignedIn: false})
		} else {
			this.setState({isSignedIn: true})
		}
	}
	
	loadUser = (data) => {
		this.setState({user: {
			username: data.username,
			email: data.email
		}})
	}
	
	render() {
		if (!this.state.isSignedIn) {
			return (
				<Signin loadUser={this.loadUser} signIn={this.signInOut} isSignedIn={this.state.isSignedIn}/>
			);
		} else {
			return (
			<div className="App">
				<Navigation signOut={this.signInOut} isSignedIn={this.state.isSignedIn} />
				<Input description="View by:" labels={["Day", "Week"]} active={this.state.viewBy} change={this.onViewChange}/>
				{this.state.viewBy === "Day" ?
					<div>
						<DateInput description="Date:"  change={this.onDateChange}/>
						<button onClick={() => {this.onDateChange(this.shiftDate(this.state.date, -1))}}>Prev</button>
						<button onClick={() => {this.onDateChange(this.shiftDate(this.state.date, 1))}}>Next</button>
						<Table 
							date={this.state.date} 
							username={this.state.user.username} 
							key={this.state.date} //key is to create a new table whenever date is changed
						/>
					</div>
					:
					<div>
						<Input description="Week:" labels={[1,2,3,4]} active={this.state.week} change={this.onWeekChange}/>
						<button onClick={() => {this.onWeekChange(this.state.week - 1)}}>Prev</button>
						<button onClick={() => {this.onWeekChange(this.state.week + 1)}}>Next</button>
						<TableList 
							date={this.state.date} 
							username={this.state.user.username} 
							shiftDate={this.shiftDate}
							key={this.state.week} //key is to create a new table whenever date is changed
						/>
					</div>
				}
			</div>
			);
		}
	}
}

export default App;
