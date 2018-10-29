import React, { Component } from 'react';
import './App.css';
import Input from './Input.js';
import DateInput from './DateInput.js';
import Table from './Table.js';
import TableList from './TableList.js';
import Signin from './Signin.js';
import Navigation from './Navigation.js';
import AddUser from './AddUser.js';

class App extends Component {
	constructor() {
		super();
		const today = new Date();
		today.setHours(0,0,0,0);
		let startDate = new Date(today);
		startDate.setDate(today.getDate() - 1);
		let endDate = new Date(today);
		endDate.setDate(today.getDate() + 14);
		this.state = {
			viewBy: "Day",
			date: today,
			startDate: startDate,
			endDate: endDate,
			week: 1, //TODO: set limits to the week. can only go up to 4 or 5.
			isSignedIn: false,
			isAdmin: false,
			path: 'signin',
			user: {
				username: "css",
				email: "css.gmail.com",
			}
		}
	}
	
	
	onViewChange = (input) => {
		const tempDate = new Date();
		tempDate.setHours(0,0,0,0);
		if (this.state.viewBy === "Day") //which means changing to week soon
		{
			this.setState({week: this.getWeek(tempDate)});
		}
		this.setState({date: tempDate}); //reset date to today
		this.setState({viewBy: input});
	}
	
	getWeek = (date) => {
		let tempDate = new Date(date);
		while (tempDate.getDay() !== 1){
			tempDate.setDate(tempDate.getDate()-1);
		}
		return Math.ceil((tempDate.getDate()-1)/7)+1;
	}
	
	onDateChange = (input) => {
		if (input <= this.state.endDate && input >= this.state.startDate) {
			this.setState({date: input});
		}
	}
	
	onWeekChange = (input) => {
		const prevState = this.state.week;
		let firstDay = this.state.date;
		if (input > prevState) { //positive increment
			do {
				firstDay = this.shiftDate(firstDay, +1);
			} while (firstDay.getDay() !== 1 && firstDay < this.state.endDate) 
			if (firstDay.getDay() === 1) { //if firstDay is monday, then only shift the date and week. Else do nothing
				this.setState({date: firstDay});
				this.setState({week: input});
			}
		} else if (input < prevState) { //negative increment
			if (firstDay.getDay() === 1) {
				do {
					firstDay = this.shiftDate(firstDay, -1);
				} while (firstDay.getDay() !== 1 && firstDay > this.state.startDate)
				this.setState({week: input});
			} else { //if not monday
				while (firstDay > this.state.startDate) {
				 	firstDay = this.shiftDate(firstDay, -1);
				}
				
			}
			this.setState({date: firstDay});
		}
		
	}
	
	shiftDate = (today, increment) => {
		let newDate = new Date(today);
		newDate.setDate(today.getDate() + increment);
		return newDate;
	}
	
	signInOut = (isSignedIn) => {
		if (isSignedIn) {
			this.setState({isSignedIn: false, isAdmin: false, path: 'signin'});
		} else {
			this.setState({isSignedIn: true, path: 'home'});
		}
	}

	adminSignIn = () => {
		this.setState({isAdmin: true})
	}
	
	loadUser = (data) => {
		this.setState({user: {
			username: data.username,
			email: data.email
		}})
	}

	changePath = (newPath) => {
		this.setState({path: newPath});
	}
	
	render() {
		if (!this.state.isSignedIn) {
			return (
				<Signin 
					loadUser={this.loadUser} 
					signIn={this.signInOut} 
					isSignedIn={this.state.isSignedIn}
					adminSignIn={this.adminSignIn}
					isAdmin={this.state.isAdmin}
				/>
			);
		} else if (this.state.path === 'home') {
			return (
				<div className="App">
					<Navigation 
						signOut={this.signInOut} 
						isSignedIn={this.state.isSignedIn} 
						isAdmin={this.state.isAdmin} 
						path={this.state.path}
						changePath={this.changePath}
					/>
					<Input 
						description="View by:" 
						labels={["Day", "Week"]} 
						active={this.state.viewBy} 
						change={this.onViewChange}/>
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
							<button onClick={() => {this.onWeekChange(this.state.week - 1)}}>Prev</button>
							<button onClick={() => {this.onWeekChange(this.state.week + 1)}}>Next</button>
							<TableList 
								date={this.state.date} 
								endDate={this.state.endDate}
								username={this.state.user.username} 
								shiftDate={this.shiftDate}
								key={this.state.week} //key is to create a new table whenever date is changed
							/>
						</div>
					}
				</div>
			);
		} else {
			return (
				<div>
					<Navigation 
						signOut={this.signInOut} 
						isSignedIn={this.state.isSignedIn} 
						isAdmin={this.state.isAdmin} 
						path={this.state.path}
						changePath={this.changePath}
					/>
					<AddUser />
				</div>
			);
		}


	}
}
//<Input description="Week:" labels={[1,2,3,4]} active={this.state.week} change={this.onWeekChange}/>

export default App;
